// 📌 Objectif : Calculer le taux de remplissage et autres stats

import { useMemo } from "react";
import { Formation } from "../types/Formations";

export const useFormationStats = (formations: Formation[]) => {
  return useMemo(() => {
    const totalPlaces = formations.reduce((sum, f) => sum + f.totalPlaces, 0);
    const totalInscrits = formations.reduce((sum, f) => sum + f.inscritsCrif + f.inscritsMp, 0);
    
    return {
      tauxSaturation: totalPlaces ? (totalInscrits / totalPlaces) * 100 : 0,
      totalFormations: formations.length,
    };
  }, [formations]);
};
