// src -> hooks -> useCentres.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Centre } from "../types/Centres";

// ✅ Fonction de log en mode dev (Accepte plusieurs arguments)
const isDevelopment = typeof import.meta !== "undefined" 
  ? import.meta.env.MODE === "development" 
  : process.env.NODE_ENV === "development";

const logDebug = <T>(message: string, ...data: T[]) => {
  if (isDevelopment) {
    console.log(message, ...data);
  }
};


// 🔍 Récupérer tous les centres
export const useCentres = () => {
  return useQuery({
    queryKey: ["centres"],
    queryFn: async () => {
      const { data, error } = await supabase.from("centres").select("*");
      if (error) throw new Error(error.message);
      return data as Centre[];
    },
    staleTime: 60000,
  });
};

// ➕ Ajouter un centre
export const useAddCentre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCentre: Omit<Centre, "id" | "last_updated">) => {
      const { data, error } = await supabase.from("centres").insert([newCentre]).select();
      if (error) throw new Error(error.message);
      return data as Centre[];
    },
    onSuccess: (data) => {
      logDebug<Centre[]>("✅ Centre ajouté avec succès :", data);
      queryClient.invalidateQueries({ queryKey: ["centres"] });
    },
  });
};

// 🔄 Mettre à jour un centre
export const useUpdateCentre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Centre> & { id: number }) => {
      logDebug("🔄 Mise à jour du centre ID :", id, );

      const { data, error } = await supabase
        .from("centres")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw new Error(error.message);
      return data as Centre[];
    },
    onSuccess: (data) => {
      logDebug<Centre[]>("✅ Centre mis à jour avec succès !", data);
      queryClient.invalidateQueries({ queryKey: ["centres"] });
    },
  });
};

// ❌ Supprimer un centre
export const useDeleteCentre = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      if (typeof id !== "number") throw new Error("❌ ID du centre invalide.");

      try {
        const { data, error } = await supabase.from("centres").delete().eq("id", id).select();
        if (error) throw new Error(error.message);
        return data as Centre[];
      } catch (err) {
        console.error("❌ Erreur lors de la suppression :", err);
        throw err;
      }
    },
    onSuccess: (data) => {
      logDebug<Centre[]>("🗑 Centre supprimé avec succès :", data);
      queryClient.invalidateQueries({ queryKey: ["centres"] });
    },
  });
};
