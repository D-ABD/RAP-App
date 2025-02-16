// 📌 Objectif : Récupérer l’évolution d’une formation

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { EvolutionFormation } from "../types/EvolutionFormation";

export const useEvolutionFormations = (formationId: number) => {
  return useQuery({
    queryKey: ["evolution_formations", formationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("evolution_formations")
        .select("*")
        .eq("formation_id", formationId);
      if (error) throw new Error(error.message);
      return data as EvolutionFormation[];
    },
    enabled: !!formationId,
  });
};
