// 📌 Objectif : Écouter les mises à jour des formations en temps réel

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export const useRealtimeFormations = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 🔄 Écoute des mises à jour en temps réel sur la table "formations"
    const channel = supabase
      .channel("formations")
      .on(
        "postgres_changes", 
        { event: "*", schema: "public", table: "formations" }, 
        () => {
          queryClient.invalidateQueries({ queryKey: ["formations"] });
        }
      )
      .subscribe();

    // 🧹 Cleanup : Supprimer l'abonnement lors du démontage du composant
    return () => {
      supabase.removeChannel(channel).catch((error) => {
        console.error("Erreur lors de la suppression du canal :", error);
      });
    };
  }, [queryClient]);
};

