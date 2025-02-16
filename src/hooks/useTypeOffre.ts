import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

// 🎨 Interface pour un type d'offre récupéré depuis la BDD
export interface TypeOffre {
  id: number;
  nom: string;
}

// 🔄 Hook pour récupérer les types d'offres dynamiquement
export const useTypeOffres = () => {
  return useQuery({
    queryKey: ["type_offres"],
    queryFn: async () => {
      const { data, error } = await supabase.from("type_offres").select("*");

      if (error) {
        console.error("❌ Erreur lors de la récupération des types d'offres :", error.message);
        return []; // Retourne un tableau vide en cas d'erreur
      }

      console.log("✅ Types d'offres récupérés :", data); // Ajoute un log pour voir les données
      return data as TypeOffre[];
    },
    staleTime: 60000, // Cache pendant 1 min
  });
};
