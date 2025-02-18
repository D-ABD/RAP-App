import { useMemo } from "react";
import { Formation } from "../types/Formations";

interface FilterOptions {
  search?: string;
  status_id?: number | "";
  type_offre_id?: number | "";
  centre_id?: number | "";
}

export const useFilterFormations = (
  formations: Formation[] | undefined,
  filters: FilterOptions
) => {
  return useMemo(() => {
    if (!formations) return [];

    return formations.filter((formation) => {
      // Filtre par nom/recherche
      const searchMatch = !filters.search
        ? true
        : formation.nom.toLowerCase().includes(filters.search.toLowerCase());

      // Filtre par statut
      const statusMatch = !filters.status_id
        ? true
        : formation.status_id === filters.status_id;

      // Filtre par type d'offre
      const typeOffreMatch = !filters.type_offre_id
        ? true
        : formation.type_offre_id === filters.type_offre_id;

      // Filtre par centre
      const centreMatch = !filters.centre_id
        ? true
        : formation.centre_id === filters.centre_id;

      return searchMatch && statusMatch && typeOffreMatch && centreMatch;
    });
  }, [formations, filters]);
};