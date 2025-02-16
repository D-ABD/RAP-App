// 🎯 Objectif : Gérer les ressources associées aux formations

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Ressources } from "../types/Ressources";

// 🔍 Récupérer les ressources d'une formation spécifique
export const useRessources = (formationId: number) => {
  return useQuery({
    queryKey: ["ressources", formationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ressources")
        .select("*")
        .eq("formation_id", formationId);
      if (error) throw new Error(error.message);
      return data as Ressources[];
    },
    enabled: !!formationId, // Ne s'exécute que si formationId est défini
  });
};

// ➕ Ajouter une ressource
export const useAddRessource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRessource: Omit<Ressources, "id" | "last_updated">) => {
      const { data, error } = await supabase.from("ressources").insert([newRessource]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ressources", variables.formation_id] });
    },
  });
};

// 🔄 Mettre à jour une ressource
export const useUpdateRessource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Ressources> & { id: number }) => {
      const { error } = await supabase
        .from("ressources")
        .update(updates)
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ressources", variables.id] });
    },
  });
};

// ❌ Supprimer une ressource
export const useDeleteRessource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("ressources").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["ressources", id] });
    },
  });
};
