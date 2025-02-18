import { useDeleteFormation } from "../hooks/useFormations";
import { Formation } from "../types/Formations";
import { FormationEditButton } from "./FormationEditButton";
import { FormationDeleteButton } from "./FormationDeleteButton";

interface FormationListProps {
  formations: Formation[]; // 📌 Liste des formations à afficher
  isLoading: boolean; // ⏳ Indique si les données sont en cours de chargement
  error: Error | null; // ❌ Contient une erreur si la récupération des données échoue
  setEditingFormation: (formation: Formation | null) => void; // ✏️ Fonction pour activer le mode édition
}

/**
 * Composant `FormationList`
 * --------------------------
 * 📌 Affiche une liste de formations avec des boutons d'édition et de suppression.
 * 🔄 Gère l'état de chargement (`isLoading`) et les erreurs (`error`).
 * 🛠️ Permet de modifier ou supprimer une formation.
 */
export function FormationList({ formations, isLoading, error, setEditingFormation }: FormationListProps) {
  // 🛑 Hook pour gérer la suppression d'une formation via Supabase
  const deleteFormation = useDeleteFormation();

  /**
   * 🔄 Gère la suppression d'une formation
   * - Affiche une confirmation avant de supprimer la formation.
   * - Envoie la requête à Supabase via `deleteFormation.mutateAsync()`.
   * - Gère les erreurs si la suppression échoue.
   */
  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous supprimer cette formation ?")) {
      try {
        await deleteFormation.mutateAsync({ id });
      } catch (error) {
        console.error("❌ Erreur lors de la suppression de la formation :", error);
      }
    }
  };

  // ⏳ Affichage du message de chargement si les données sont en cours de récupération
  if (isLoading) return <p>Chargement...</p>;

  // ❌ Affichage d'un message d'erreur si la récupération des données échoue
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <ul className="mt-6 space-y-2">
      {/* 🔄 Boucle sur les formations pour les afficher sous forme de liste */}
      {formations?.map((formation) => (
        <li key={formation.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
          <div>
            {/* 📌 Affichage du nom de la formation */}
            <h3 className="text-lg font-bold">{formation.nom}</h3>

            {/* 🏫 Affichage du centre de formation (ID ou "Non défini") */}
            <p className="text-gray-600">📍 Centre ID : {formation.centre_id ?? "Non défini"}</p>

            {/* 📅 Affichage des dates de début et de fin (ou "Non défini" si absentes) */}
            <p className="text-gray-500">
              📅 {formation.dateDebut ? new Date(formation.dateDebut).toLocaleDateString() : "Non défini"} → 
              {formation.dateFin ? new Date(formation.dateFin).toLocaleDateString() : "Non défini"}
            </p>
          </div>

          {/* 🛠️ Boutons pour modifier ou supprimer la formation */}
          <div className="flex gap-2">
            {/* ✏️ Bouton Modifier */}
            <FormationEditButton onEdit={() => setEditingFormation(formation)} />

            {/* 🗑️ Bouton Supprimer */}
            <FormationDeleteButton onDelete={() => handleDelete(formation.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
