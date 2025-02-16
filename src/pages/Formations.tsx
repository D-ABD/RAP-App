import { Link } from "react-router-dom";
import { useFormations } from "../hooks/useFormations";

export default function Formations() {
  const { data: formations, isLoading, error } = useFormations();

  if (isLoading) return <p className="text-center">Chargement des formations...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📚 Liste des Formations</h2>

      {formations?.length === 0 ? (
        <p className="text-gray-500">Aucune formation disponible.</p>
      ) : (
        <ul className="space-y-4">
          {formations?.map((formation) => (
            <li key={formation.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{formation.nom}</h3>
                <p className="text-gray-600">📍 {formation.centre?.nom || "Centre inconnu"}</p>
                <p className="text-gray-500">
                  📅 {new Date(formation.dateDebut).toLocaleDateString()} → {new Date(formation.dateFin).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/formation/${formation.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Voir Détails
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
