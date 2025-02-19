import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormations } from "../hooks/useFormations";
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, Button, Chip, Stack, Pagination, Paper } from "@mui/material";
import FormationFilters from "../components/FormationFilters";

export default function Formations() {
  const { data: formations, isLoading, error } = useFormations();

  // 📌 États pour la pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Nombre d'éléments affichés par page

  // 📌 États pour les filtres
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

  // 📌 Filtrage des formations
  const filteredFormations = formations?.filter((formation) => {
    return (
      (filters.search === "" || formation.nom.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status_id === "" || formation.status_id === filters.status_id) &&
      (filters.type_offre_id === "" || formation.type_offre_id === filters.type_offre_id) &&
      (filters.centre_id === "" || formation.centre_id === filters.centre_id)
    );
  }) ?? [];

  // 📌 Mise à jour de la pagination après filtrage
  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);
  const displayedFormations = filteredFormations.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography color="error" variant="h6">❌ Erreur : {error.message}</Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      {/* En-tête */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={4}>
        <Typography variant="h4" fontWeight="bold">📚 Liste des Formations</Typography>
        <Button 
          component={Link} 
          to="/Mgo/" 
          variant="contained" 
          color="secondary"
        >
          
          ➕ Créer une formation
        </Button>
      </Box>

      {/* 🔍 Zone des filtres */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FormationFilters onFilterChange={setFilters} />
      </Paper>

      {/* 📋 Liste des formations filtrées */}
      {filteredFormations.length === 0 ? (
        <Box textAlign="center" py={6} bgcolor="white" borderRadius={2} boxShadow={1}>
          <Typography color="textSecondary">Aucune formation ne correspond aux critères.</Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayedFormations.map((formation) => (
              <Grid item xs={12} sm={6} md={4} key={formation.id}>
                <Card 
                  sx={{ 
                    p: 2, 
                    boxShadow: 3, 
                    transition: "0.3s", 
                    "&:hover": { boxShadow: 6 },
                    background: "linear-gradient(to bottom, #f9f9f9, #ffffff)" 
                  }}
                >
                  <CardContent>
                    {/* Titre et centre */}
                    <Typography variant="h6" fontWeight="bold">{formation.nom}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      📍 {formation.centre_nom || "Centre non défini"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      📅 {formation.dateDebut 
                        ? new Date(formation.dateDebut).toLocaleDateString('fr-FR') 
                        : "Non défini"} 
                      {formation.dateFin && ` → ${new Date(formation.dateFin).toLocaleDateString('fr-FR')}`}
                    </Typography>

                    {/* Labels */}
                    <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                      <Chip label={formation.statusLabel} color="primary" variant="outlined" />
                      <Chip label={formation.typeOffreLabel} color="success" variant="outlined" />
                    </Box>

                    {/* Informations sur les effectifs */}
                    <Box mt={2} p={1} sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">👥 À recruter :</Typography>
                        <Typography variant="body2">{formation.aRecruter ?? "N/A"}</Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" fontWeight="bold">📊 Places totales :</Typography>
                        <Typography variant="body2">{formation.totalPlaces ?? "N/A"}</Typography>
                      </Stack>
                    </Box>

                    {/* Bouton Voir Détails */}
                    <Box mt={3}>
                      <Button 
                        component={Link} 
                        to={`/formation/${formation.id}`} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                      >
                        Voir Détails →
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
