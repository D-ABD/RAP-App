import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Formation, NouvelleFormation, ModifierFormation, SupprimerFormation } from "../types/Formations";
import { TypeOffre } from "./useTypeOffre";

// 🎯 Récupérer toutes les formations
export const useFormations = () => {
  return useQuery({
    queryKey: ["formations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select("id, nom, status_id, type_offre_id, dateDebut, dateFin, centre_id"); // ✅ Correction

      if (error) throw new Error(error.message);

      return data.map((formation) => ({
        ...formation,
        status_id: formation.status_id as number | null, // ✅ Accepte `null`
        type_offre_id: formation.type_offre_id as number | null, // ✅ Accepte `null`
        dateDebut: formation.dateDebut ? new Date(formation.dateDebut) : null, 
        dateFin: formation.dateFin ? new Date(formation.dateFin) : null, 
      })) as Formation[];
    },
    staleTime: 60000,
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

// 🎯 Récupérer une formation par son ID
export const useFormationById = (id: number) => {
  return useQuery({
    queryKey: ["formation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("formations")
        .select(`
          id, nom, status_id, typeOffre_id, dateDebut, dateFin, centre_id
        `)
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);

      return {
        ...data,
        status_id: data.status_id as number, // ✅ Utilisation de status_id
        typeOffre: data.typeOffre_id as TypeOffre,
        dateDebut: data.dateDebut ? new Date(data.dateDebut) : null, // ✅ Conversion explicite
        dateFin: data.dateFin ? new Date(data.dateFin) : null, // ✅ Conversion explicite
      } as Formation;
    },
    enabled: Boolean(id),
  });
};

// 🔄 Mettre à jour une formation
export const useUpdateFormation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formation: ModifierFormation) => {
      // ✅ Valeur par défaut pour éviter les erreurs SQL
      const DEFAULT_STATUS_ID = 99;

      const formationData = {
        ...formation,
        status_id: formation.status_id || DEFAULT_STATUS_ID,
        type_offre_id: formation.type_offre_id !== undefined ? formation.type_offre_id : null,
      };

      const { data, error } = await supabase
        .from("formations")
        .update(formationData)
        .eq("id", formation.id)
        .select();

      if (error) throw new Error(error.message);
      return data as Formation[];
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      queryClient.invalidateQueries({ queryKey: ["formation", variables.id] });
    },
    onError: (error) => {
      console.error("❌ Erreur lors de la mise à jour de la formation :", error);
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
