import { useState, useEffect } from "react";
import { StatusSelect } from "../components/StatusSelect";
import { SearchInput } from "../components/SearchInput";
import CentreSelect from "../components/CentreSelect";
import { TypeOffreSelect } from "../components/TypeOffreSelect";
import { FormControl, Paper, Box, Stack, Button, Typography } from "@mui/material";

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
   */
  useEffect(() => {
    onFilterChange({
      search,
      status_id: selectedStatus === "" ? "" : Number(selectedStatus),
      type_offre_id: selectedTypeOffre === "" ? "" : Number(selectedTypeOffre),
      centre_id: selectedCentre === "" ? "" : Number(selectedCentre),
    });
  }, [search, selectedStatus, selectedTypeOffre, selectedCentre, onFilterChange]);

  /**
   * 🔄 Réinitialise tous les filtres à leur valeur par défaut
   */
  const resetFilters = () => {
    setSearch("");
    setSelectedStatus("");
    setSelectedTypeOffre("");
    setSelectedCentre("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      {/* 📌 Titre des filtres */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        🔍 Filtres de recherche
      </Typography>

      <Stack spacing={2}>
        {/* 🔍 Barre de recherche */}
        <SearchInput 
          value={search} 
          onChange={setSearch} 
          placeholder="Rechercher une formation..." 
        />

        {/* 📌 Sélecteurs de filtres */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
        </Stack>

        {/* 🎯 Bouton de réinitialisation */}
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" color="secondary" onClick={resetFilters}>
            Réinitialiser les filtres
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
