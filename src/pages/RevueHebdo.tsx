import { useState } from "react";
import FormationFilters from "../components/FormationFilters";
import FormationListFiltre from "../components/FormationListFiltre";

/**
 * Composant `RevueHebdo`
 * -----------------------
 * 📌 Ce composant est la page principale de la revue hebdomadaire des formations.
 * 🔄 Il gère l'état des filtres et les passe aux composants `FormationFilters` et `FormationListFiltre`.
 * 🎯 Il permet une expérience utilisateur fluide avec une mise à jour dynamique des résultats.
 */
export default function RevueHebdo() {
  /**
   * 📝 État local `filters`
   * - Stocke les valeurs des filtres utilisés pour filtrer les formations.
   * - `search` : Recherche textuelle.
   * - `status_id` : Filtrage par statut de la formation.
   * - `type_offre_id` : Filtrage par type d’offre de formation.
   * - `centre_id` : Filtrage par centre de formation.
   * ✅ Chaque filtre peut être un `number` (valeur sélectionnée) ou `""` (tous les résultats).
   */
  const [filters, setFilters] = useState<{ 
    search: string; 
    status_id: number | ""; 
    type_offre_id: number | ""; 
    centre_id: number | ""; 
  }>({
    search: "",
    status_id: "",
    type_offre_id: "",
    centre_id: "",
  });

  return (
    <div className="container mx-auto p-6">
      {/* 🏷️ Titre de la page */}
      <h1 className="text-2xl font-bold mb-6">📅 Revue Hebdomadaire des Formations</h1>

      {/* 🔍 Composant qui gère les filtres et met à jour `filters` automatiquement */}
      <FormationFilters onFilterChange={setFilters} />

      {/* 📋 Composant qui affiche la liste des formations filtrées */}
      <FormationListFiltre filters={filters} />
    </div>
  );
}
