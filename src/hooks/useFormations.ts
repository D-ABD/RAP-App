import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Formation, NouvelleFormation, SupprimerFormation } from "../types/Formations";

// 🎯 Récupérer toutes les formations
export const useFormations = () => {
  return useQuery({
    queryKey: ["formations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select(`
          *,
          centre:centres(*),
          status:statuts(*),
          type_offre:type_offres(*)
        `);

      if (error) throw new Error(error.message);

      return data.map((formation) => ({
        ...formation,
        status_id: formation.status_id as number | null,
        type_offre_id: formation.type_offre_id as number | null,
        dateDebut: formation.dateDebut ? new Date(formation.dateDebut) : null,
        dateFin: formation.dateFin ? new Date(formation.dateFin) : null,
        statusLabel: formation.status?.nom || "Non défini",
        typeOffreLabel: formation.type_offre?.nom || "Non défini",
        centre_nom: formation.centre?.nom || "Centre non défini"
      })) as Formation[];
    },
    staleTime: 60000,
  });
};

// 🎯 Récupérer une formation par son ID
export const useFormationById = (id: number) => {
  return useQuery({
    queryKey: ["formation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select(`
          *,
          centre:centres(*),
          status:statuts(*),
          type_offre:type_offres(*)
        `)
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      if (!data) throw new Error("Formation non trouvée");

      return {
        ...data,
        dateDebut: data.dateDebut ? new Date(data.dateDebut) : null,
        dateFin: data.dateFin ? new Date(data.dateFin) : null,
        last_updated: data.last_updated ? new Date(data.last_updated) : null,
        statusLabel: data.status?.nom || "Non défini",
        typeOffreLabel: data.type_offre?.nom || "Non défini",
        centre_nom: data.centre?.nom || "Centre non défini"
      } as Formation;
    },
    enabled: Boolean(id),
  });
};

// 🎯 Ajouter une formation
export const useAddFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFormation: NouvelleFormation) => {
      console.log("🔍 Données envoyées à Supabase :", newFormation); // Debugging

      if (!newFormation.centre_id) {
        throw new Error("❌ Erreur : centre_id est obligatoire avant insertion.");
      }

      // ✅ Valeur par défaut pour status_id et type_offre_id si absents
      const DEFAULT_STATUS_ID = 99; // Assure-toi que 99 correspond bien à "NON_DÉFINI" dans ta table `statuts`
      const DEFAULT_TYPE_OFFRE_ID = null; // Peut être `NULL` si non obligatoire

      const formationData = {
        ...newFormation,
        status_id: newFormation.status_id || DEFAULT_STATUS_ID, // Assure une valeur si absent
        type_offre_id: newFormation.type_offre_id !== undefined ? newFormation.type_offre_id : DEFAULT_TYPE_OFFRE_ID, 
      };

      console.log("🚀 Données finales envoyées à Supabase :", formationData);

      const { data, error } = await supabase
        .from("formations")
        .insert([formationData])
        .select();

      if (error) throw new Error(error.message);
      return data as Formation[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
    },
    onError: (error) => {
      console.error("❌ Erreur lors de l'ajout d'une formation :", error);
    },
  });
};



// ❌ Supprimer une formation
export const useDeleteFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: SupprimerFormation) => {
      const { data, error } = await supabase
        .from("formations")
        .delete()
        .eq("id", id)
        .select();
      if (error) throw new Error(error.message);
      return data as Formation[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
    },
    onError: (error) => {
      console.error("❌ Erreur lors de la suppression de la formation :", error);
    },
  });
};
