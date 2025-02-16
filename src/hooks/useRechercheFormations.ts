import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { CritèresRechercheFormation, Pagination } from "../types/Recherche";
import { Formation } from "../types/Formations";

// 🔍 Hook pour rechercher et paginer les formations
export const useRechercheFormations = (
  filters: CritèresRechercheFormation,
  pagination: Pagination
) => {
  return useQuery({
    queryKey: ["formations", filters, pagination],
    queryFn: async () => {
      let query = supabase.from("formations").select("*");

      // Appliquer les filtres dynamiquement
      if (filters.nom) query = query.ilike("nom", `%${filters.nom}%`);
      if (filters.centre_id) query = query.eq("centre_id", filters.centre_id);
      if (filters.typeOffre) query = query.eq("typeOffre", filters.typeOffre);
      if (filters.status_id) query = query.eq("status", filters.status_id);
      if (filters.dateDebut) query = query.gte("dateDebut", filters.dateDebut);
      if (filters.dateFin) query = query.lte("dateFin", filters.dateFin);
      if (filters.aRecruter) query = query.gt("aRecruter", 0);
      if (filters.complet) query = query.eq("totalPlaces", 0);
      if (filters.abandonnee) query = query.eq("status", "ANNULEE");

      // Gestion de la pagination
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);

      const { data, error } = await query;
      if (error) throw error;
      return data as Formation[];
    },
    staleTime: 60000, // Cache des résultats pendant 60 secondes
  });
};
