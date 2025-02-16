import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

// 🎨 Interface pour un statut récupéré depuis la BDD
export interface Statut {
  id: number;
  nom: string;
}

// 🎨 Fonction pour récupérer la pastille associée à un statut
export const getPastilleStatus = (status: string): string => {
  const pastilles: Record<string, string> = {
    "COMPLETE": "🟢 Complete",
    "QUASI_COMPLETE": "🟠 Quasi Complete",
    "A_RECRUTER": "🔴 À Recruter",
    "ANNULEE": "⚪ Annulée",
    "EN_COURS": "🔵 En cours",
    "REPORTEE": "🟡 Reportée",
    "TERMINEE": "⚫ Terminée",
    "NON_DEFINI": "❓ Statut non défini",
  };
  return pastilles[status] || "❓ Statut inconnu";
};

// 🔄 Hook pour récupérer les statuts depuis Supabase
export const useStatuts = () => {
  return useQuery({
    queryKey: ["statuts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("statuts").select("id, nom");
      if (error) throw new Error(`❌ Erreur lors de la récupération des statuts : ${error.message}`);
      return data as Statut[];
    },
    staleTime: 60000, // Cache pendant 1 min
  });
};
