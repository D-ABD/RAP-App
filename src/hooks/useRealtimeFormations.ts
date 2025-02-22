import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js"; // ✅ Import correct

export const useRealtimeFormations = () => {
  const queryClient = useQueryClient();
  const channelRef = useRef<RealtimeChannel | null>(null); // ✅ Type correct

  useEffect(() => {
    if (!channelRef.current) {
      // 🔄 Écoute des mises à jour en temps réel sur la table "formations"
      channelRef.current = supabase
        .channel("formations")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "formations" },
          () => {
            queryClient.invalidateQueries({ queryKey: ["formations"] });
          }
        )
        .subscribe();
    }

    // 🧹 Cleanup : Supprimer l'abonnement lors du démontage du composant
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current).catch((error) => {
          console.error("Erreur lors de la suppression du canal :", error);
        });
        channelRef.current = null;
      }
    };
  }, [queryClient]);
};
