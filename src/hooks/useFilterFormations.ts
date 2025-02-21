import { useMemo } from "react";
import { Formation } from "../types/Formations";

interface FilterOptions {
  search?: string;
  status_id?: number | "";
  type_offre_id?: number | "";
  centre_id?: number | "";
  dateDebut?: string | "";  // Filtre par date de début
  dateFin?: string | "";    // Filtre par date de fin
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

      // Filtre par date de début (vérification que la date existe et est valide)
      const dateDebutMatch = !filters.dateDebut
        ? true
        : new Date(formation.dateDebut || "").getTime() >= new Date(filters.dateDebut).getTime();

      // Filtre par date de fin (vérification que la date existe et est valide)
      const dateFinMatch = !filters.dateFin
        ? true
        : new Date(formation.dateFin || "").getTime() <= new Date(filters.dateFin).getTime();

      return searchMatch && statusMatch && typeOffreMatch && centreMatch && dateDebutMatch && dateFinMatch;
    });
  }, [formations, filters]);
};
