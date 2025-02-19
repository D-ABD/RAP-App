import { useState } from "react";
import FormationFilters from "../components/FormationFilters";
import FormationListFiltre from "../components/FormationListFiltre";
import { Container, Typography, Paper, Box } from "@mui/material";

/**
 * Composant `RevueHebdo`
 * -----------------------
 * 📌 Page principale de la revue hebdomadaire des formations.
 * 🔄 Gère l'état des filtres et les passe aux composants `FormationFilters` et `FormationListFiltre`.
 * 🎯 Permet une expérience utilisateur fluide avec une mise à jour dynamique des résultats.
 */
export default function RevueHebdo() {
  /**
   * 📝 État local `filters`
   * - Stocke les valeurs des filtres utilisés pour filtrer les formations.
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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* 🏷️ Titre de la page */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📅 Revue Hebdomadaire des Formations
      </Typography>

      {/* 🔍 Zone des filtres */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FormationFilters onFilterChange={setFilters} />
      </Paper>

      {/* 📋 Liste des formations filtrées */}
      <Box>
        <FormationListFiltre filters={filters} />
      </Box>
    </Container>
  );
}
