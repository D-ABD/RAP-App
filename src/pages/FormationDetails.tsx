import { useParams } from "react-router-dom";
import { useFormationById } from "../hooks/useFormations";
import CommentairesRevue from "../components/CommentairesRevue";

export default function FormationDetails() {
  const { id } = useParams(); // 📌 Récupérer l'ID depuis l'URL
  const formationId = id ? parseInt(id, 10) : 0; // ✅ Utiliser 0 comme valeur par défaut

  const { data: formation, isLoading, error } = useFormationById(formationId);

  if (isLoading) return <p className="text-center">Chargement...</p>;
  if (error || !formation) return <p className="text-center text-red-500">Formation introuvable.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 {formation.nom}</h2>
      <p className="text-gray-700">📍 Centre : <strong>{formation.centre?.nom || "Non spécifié"}</strong></p>
      <p className="text-gray-500">📅 Du {new Date(formation.dateDebut).toLocaleDateString()} au {new Date(formation.dateFin).toLocaleDateString()}</p>
      <p className="text-blue-500 font-semibold mt-2">📌 Statut : {formation.status}</p>

      {/* Intégration des commentaires */}
      <div className="mt-6">
        {formationId > 0 ? (
          <CommentairesRevue formationId={formationId} />
        ) : (
          <p className="text-center text-gray-500">Impossible de charger les commentaires.</p>
        )}
      </div>
    </div>
  );
}
