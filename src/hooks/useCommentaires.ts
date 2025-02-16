import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Commentaire } from "../types/Commentaires";

// 🔍 Récupérer les commentaires d'une formation
export const useCommentaires = (formationId: number | null) => {
  return useQuery({
    queryKey: ["commentaires", formationId],
    queryFn: async () => {
      if (!formationId) return []; // ✅ Évite les requêtes inutiles si formationId est null
      
      const { data, error } = await supabase
        .from("commentaires")
        .select("*")
        .eq("formation_id", formationId);
      
      if (error) throw new Error(error.message);
      return data as Commentaire[];
    },
    enabled: !!formationId, // ✅ Empêche l'exécution si formationId est null ou undefined
  });
};

// ➕ Ajouter un commentaire
export const useAddCommentaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCommentaire: Omit<Commentaire, "id" | "created_at">) => {
      const { data, error } = await supabase.from("commentaires").insert([newCommentaire]).select();
      if (error) throw new Error(error.message);
      return data as Commentaire[]; // ✅ Retourne les nouveaux commentaires ajoutés
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["commentaires", data[0].formation_id] });
      }
    },
  });
};

// 🔄 Mettre à jour un commentaire
export const useUpdateCommentaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentaire: { id: number; text: string }) => {
      const { data, error } = await supabase
        .from("commentaires")
        .update({ text: commentaire.text })
        .eq("id", commentaire.id)
        .select();
      
      if (error) throw new Error(error.message);
      return data as Commentaire[]; // ✅ Retourne les données mises à jour
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["commentaires", data[0].formation_id] });
      }
    },
  });
};

// ❌ Supprimer un commentaire
export const useDeleteCommentaire = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase.from("commentaires").delete().eq("id", id).select();
      if (error) throw new Error(error.message);
      return data as Commentaire[];
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        queryClient.invalidateQueries({ queryKey: ["commentaires", data[0].formation_id] });
      }
    },
  });
};
