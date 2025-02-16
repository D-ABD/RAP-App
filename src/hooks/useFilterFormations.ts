// 📌 Objectif : Filtrer les formations par statut, centre, type d’offre

import { useMemo } from "react";
import { Formation } from "../types/Formations";
import { TypeOffre } from "../types/TypeOffre";

export const useFilterFormations = (formations: Formation[], filters: { 
  search?: string; 
  status_id?: number;  // 🔄 Remplacement de `status` par `status_id`
  typeOffre?: TypeOffre;
}) => {
  return useMemo(() => {
    return formations.filter((formation) =>
      (filters.search ? formation.nom.toLowerCase().includes(filters.search.toLowerCase()) : true) &&
      (filters.status_id ? formation.status_id === filters.status_id : true) &&  // 🔄 Vérification par `status_id`
      (filters.typeOffre ? formation.typeOffre === filters.typeOffre : true)
    );
  }, [formations, filters]);
};
