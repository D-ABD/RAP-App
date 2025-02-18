import { useState, useEffect } from "react";
import { StatusSelect } from "../components/StatusSelect";
import { SearchInput } from "../components/SearchInput";
import CentreSelect from "../components/CentreSelect";
import { TypeOffreSelect } from "../components/TypeOffreSelect";
import { FormControl } from "@mui/material";

interface FormationFiltersProps {
  onFilterChange: (filters: { search: string; status_id: number | ""; type_offre_id: number | ""; centre_id: number | "" }) => void;
}

/**
 * Composant `FormationFilters`
 * -----------------------------
 * 📌 Gère les filtres de recherche pour la liste des formations.
 * 🔄 Stocke localement les filtres et notifie `RevueHebdo.tsx` à chaque changement.
 * 🎯 Utilise `useEffect` pour envoyer les nouveaux filtres automatiquement.
 */
export default function FormationFilters({ onFilterChange }: FormationFiltersProps) {
  // 📝 États locaux pour chaque filtre
  const [search, setSearch] = useState(""); // 🔍 Recherche par texte
  const [selectedStatus, setSelectedStatus] = useState<number | "">(""); // 📌 Statut de la formation
  const [selectedTypeOffre, setSelectedTypeOffre] = useState<number | "">(""); // 🎓 Type d'offre
  const [selectedCentre, setSelectedCentre] = useState<number | "">(""); // 🏫 Centre de formation

  /**
   * 🔄 Met à jour les filtres et notifie le parent (`RevueHebdo.tsx`)
   * - Appelé automatiquement à chaque changement de filtre grâce à `useEffect`.
   * - Convertit les valeurs de `string` à `number | ""` pour éviter les erreurs TypeScript.
   */
  useEffect(() => {
    onFilterChange({
      search,
      status_id: selectedStatus === "" ? "" : Number(selectedStatus),
      type_offre_id: selectedTypeOffre === "" ? "" : Number(selectedTypeOffre),
      centre_id: selectedCentre === "" ? "" : Number(selectedCentre),
    });
  }, [search, selectedStatus, selectedTypeOffre, selectedCentre, onFilterChange]);

  return (
    <div className="space-y-4 mb-8">
      {/* 🔍 Barre de recherche */}
      <div className="w-full">
        <SearchInput 
          value={search} 
          onChange={setSearch} 
          placeholder="Rechercher une formation..." 
        />
      </div>

      {/* 📌 Sélecteurs de filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🏷️ Sélecteur de statut */}
        <FormControl fullWidth>
          <StatusSelect 
            value={selectedStatus} 
            onChange={setSelectedStatus} 
          />
        </FormControl>

        {/* 🎓 Sélecteur de type d'offre */}
        <FormControl fullWidth>
          <TypeOffreSelect 
            value={selectedTypeOffre} 
            onChange={setSelectedTypeOffre} 
          />
        </FormControl>

        {/* 🏫 Sélecteur de centre de formation */}
        <FormControl fullWidth>
          <CentreSelect 
            value={selectedCentre} 
            onChange={setSelectedCentre} 
          />
        </FormControl>
      </div>
    </div>
  );
}
