import { useState } from "react";
import { useCentres, useAddCentre, useUpdateCentre, useDeleteCentre } from "../hooks/useCentres";
import { Centre } from "../types/Centres";

export default function Centres() {
  const { data: centres, isLoading, error } = useCentres();
  const addCentre = useAddCentre();
  const updateCentre = useUpdateCentre();
  const deleteCentre = useDeleteCentre();

  const [formData, setFormData] = useState<{ id?: number; nom: string; adresse: string; description: string }>({
    id: undefined,
    nom: "",
    adresse: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // 📝 Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Soumission du formulaire :", formData);

    if (!formData.nom.trim()) return;

    if (isEditing) {
      if (!formData.id) {
        console.error("❌ Erreur: ID du centre manquant !");
        return;
      }
      console.log("🛠 Mise à jour du centre...");
      updateCentre.mutate(
        { id: formData.id, nom: formData.nom, adresse: formData.adresse, description: formData.description },
        { onSuccess: resetForm }
      );
    } else {
      console.log("➕ Ajout d'un nouveau centre...");
      addCentre.mutate(
        { nom: formData.nom, adresse: formData.adresse, description: formData.description },
        { onSuccess: resetForm }
      );
    }
  };

  // ✏️ Passer en mode édition
  const handleEdit = (centre: Centre) => {
    if (!centre.id) {
      console.error("❌ Erreur: Centre sans ID !");
      return;
    }

    console.log("🔧 Mode édition activé pour :", centre);
    setFormData({
      id: centre.id,
      nom: centre.nom,
      adresse: centre.adresse ?? "",
      description: centre.description ?? "",
    });
    setIsEditing(true);
  };

  // ❌ Suppression
  const handleDelete = (id?: number) => {
    if (!id) {
      console.error("❌ Erreur: ID du centre manquant pour la suppression !");
      return;
    }

    if (confirm("Voulez-vous supprimer ce centre ?")) {
      deleteCentre.mutate(id);
    }
  };

  // 🔄 Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({ id: undefined, nom: "", adresse: "", description: "" });
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🏫 Gestion des Centres</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom du Centre" value={formData.nom} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={addCentre.isPending || updateCentre.isPending}>
          {isEditing ? "Modifier" : "Ajouter"}
        </button>
        {isEditing && (
          <button type="button" className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mt-2" onClick={resetForm}>
            Annuler
          </button>
        )}
      </form>

      {/* Liste des Centres */}
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <ul className="mt-6">
          {centres?.map((centre) => (
            <li key={centre.id} className="border-b py-3 flex justify-between items-center">
              <div>
                <strong>{centre.nom}</strong>
                <p className="text-sm text-gray-500">{centre.adresse}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(centre)} className="bg-yellow-500 text-white px-2 py-1 rounded">✏️</button>
                <button onClick={() => handleDelete(centre.id)} className="bg-red-500 text-white px-2 py-1 rounded">🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
