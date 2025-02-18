import { useState } from "react";
import { Formation } from "../types/Formations";
import { CreateFormation } from "../components/CreateFormation";

export default function Mgo() {
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Gestion des Formations</h2>

      <CreateFormation
        onSuccess={() => setEditingFormation(null)} // ✅ Recharger après soumission
        initialData={editingFormation ?? undefined}
      />
    </div>
  );
}
