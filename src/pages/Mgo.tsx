import { useState } from "react";
import { useFormations, useAddFormation, useUpdateFormation } from "../hooks/useFormations";
import { Formation, NouvelleFormation } from "../types/Formations";
import { CreateFormation } from "../components/CreateFormation";
import { FormationList } from "../components/FormationList";

export default function Mgo() {
  const { data: formations, isLoading, error } = useFormations();
  const addFormation = useAddFormation();
  const updateFormation = useUpdateFormation();
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  const handleSubmit = async (formationData: NouvelleFormation) => {
    try {
      if (editingFormation) {
        await updateFormation.mutateAsync({ id: editingFormation.id, ...formationData });
      } else {
        await addFormation.mutateAsync(formationData);
      }
      setEditingFormation(null);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout/modification de la formation :", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Gestion des Formations</h2>

      <CreateFormation
        onSubmit={handleSubmit}
        onCancel={() => setEditingFormation(null)}
        initialData={editingFormation ?? undefined}
        isEditing={!!editingFormation}
      />
      
   

    <h2 className="text-2xl font-bold mb-4">📚 Liste des Formations</h2>
      <FormationList
        formations={formations ?? []}
        isLoading={isLoading}
        error={error}
        setEditingFormation={setEditingFormation} 
      />

      
    </div>
  );
}
