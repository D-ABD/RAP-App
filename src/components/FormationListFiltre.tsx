import { useFormations } from "../hooks/useFormations";
import { useFilterFormations } from "../hooks/useFilterFormations";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface FormationListFiltreProps {
  filters: { search: string; status_id: number | ""; type_offre_id: number | ""; centre_id: number | "" };
}

/**
 * 📌 `FormationListFiltre`
 * --------------------------
 * 🔄 Récupère les formations depuis Supabase via `useFormations()`,
 * puis applique les filtres dynamiquement avec `useFilterFormations()`.
 * ✏️ Ajoute un bouton "Modifier" à côté de chaque formation.
 */
export default function FormationListFiltre({ filters }: FormationListFiltreProps) {
  const navigate = useNavigate(); // ✅ Hook pour la navigation
  const { data: formations = [], isLoading, error } = useFormations();
  const filteredFormations = useFilterFormations(formations, filters);

  if (isLoading) {
    return <p className="text-gray-500 text-lg text-center py-8">⏳ Chargement des formations...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-lg text-center py-8">❌ Erreur : {error.message}</p>;
  }

  if (!formations.length) {
    return <p className="text-gray-500 text-lg text-center py-8">📭 Aucune formation disponible.</p>;
  }

  if (filteredFormations.length === 0) {
    return <p className="text-gray-500 text-lg text-center py-8">🔍 Aucune formation ne correspond aux critères de recherche.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFormations.map((formation) => (
        <div
          key={formation.id}
          className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{formation.nom}</h2>
            <p className="text-gray-600 text-sm">📍 {formation.centre_nom || "Centre non défini"}</p>

            {formation.dateDebut && (
              <p className="text-gray-500 text-sm">
                🗓 {new Date(formation.dateDebut).toLocaleDateString("fr-FR")}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {formation.statusLabel}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {formation.typeOffreLabel}
              </span>
            </div>

            {/* ✅ Bouton Modifier */}
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => navigate(`/formations/${formation.id}/edit`)}
            >
              ✏️ Modifier
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
