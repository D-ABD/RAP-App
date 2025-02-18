import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Formation, ModifierFormation } from "../types/Formations";

// 🔄 Mettre à jour une formation
export const useUpdateFormation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formation: ModifierFormation) => {
      // ✅ Suppression de `centre` si ce champ n'est pas utilisé
      const formationData: Partial<ModifierFormation> = { ...formation };

      // ✅ Valeurs par défaut pour éviter les erreurs SQL
      formationData.status_id = formation.status_id ?? 99;

      const { data, error } = await supabase
        .from("formations")
        .update(formationData)
        .eq("id", formation.id)
        .select("*");

      if (error) {
        console.error("❌ Erreur Supabase :", error);
        throw new Error(error.message);
      }

      return data as Formation[];
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      queryClient.invalidateQueries({ queryKey: ["formation", variables.id] });
    },
    onError: (error) => {
      console.error("❌ Erreur lors de la mise à jour de la formation :", error);
    },
  });
};
