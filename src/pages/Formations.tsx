import { Link } from "react-router-dom";
import { useFormations } from "../hooks/useFormations";

export default function Formations() {
  const { data: formations, isLoading, error } = useFormations();

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600">⏳ Chargement des formations...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">❌ Erreur : {error.message}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Liste des Formations</h2>
        <Link
          to="/formation/new"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          ➕ Nouvelle Formation
        </Link>
      </div>

      {formations?.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Aucune formation disponible.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {formations?.map((formation) => (
            <div 
              key={formation.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{formation.nom}</h3>
                  <p className="text-gray-600">
                    📍 {formation.centre_nom || "Centre non défini"}
                  </p>
                  <p className="text-gray-500">
                    📅 {formation.dateDebut 
                      ? new Date(formation.dateDebut).toLocaleDateString('fr-FR') 
                      : "Non défini"} 
                    {formation.dateFin && ` → ${new Date(formation.dateFin).toLocaleDateString('fr-FR')}`}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {formation.statusLabel}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {formation.typeOffreLabel}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/formation/${formation.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Voir Détails →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}