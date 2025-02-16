import { useDeleteFormation } from "../hooks/useFormations";
import { Formation } from "../types/Formations";
import { FormationEditButton } from "./FormationEditButton";
import { FormationDeleteButton } from "./FormationDeleteButton";

interface FormationListProps {
  formations: Formation[];
  isLoading: boolean;
  error: Error | null;
  setEditingFormation: (formation: Formation | null) => void;
}

export function FormationList({ formations, isLoading, error, setEditingFormation }: FormationListProps) {
  const deleteFormation = useDeleteFormation();

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous supprimer cette formation ?")) {
      try {
        await deleteFormation.mutateAsync({ id });
      } catch (error) {
        console.error("❌ Erreur lors de la suppression de la formation :", error);
      }
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <ul className="mt-6 space-y-2">
      {formations?.map((formation) => (
        <li key={formation.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{formation.nom}</h3>
            <p className="text-gray-600">📍 Centre ID : {formation.centre_id ?? "Non défini"}</p>
            <p className="text-gray-500">
              📅 {formation.dateDebut ? new Date(formation.dateDebut).toLocaleDateString() : "Non défini"} → 
              {formation.dateFin ? new Date(formation.dateFin).toLocaleDateString() : "Non défini"}
            </p>
          </div>

          <div className="flex gap-2">
            <FormationEditButton onEdit={() => setEditingFormation(formation)} />
            <FormationDeleteButton onDelete={() => handleDelete(formation.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
