import { useParams } from "react-router-dom";
import { useFormations } from "../hooks/useFormations";
import { Container, Typography, Paper, CircularProgress, Grid } from "@mui/material";

export default function RevueDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: formations, isLoading, error } = useFormations();

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (error) return <Typography color="error" textAlign="center">❌ Erreur : {error.message}</Typography>;

  const formation = formations?.find((f) => f.id === Number(id));

  if (!formation) return <Typography textAlign="center">❌ Formation non trouvée.</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        📋 Détails de la formation
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Grid container spacing={3}>
          {/* 🏷️ Informations Générales */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">🎓 Informations Générales</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Nom :</strong> {formation.nom}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Centre :</strong> {formation.centre_nom ?? "Non défini"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>ID Centre :</strong> {formation.centre_id ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Statut :</strong> {formation.statusLabel ?? "Non défini"} (ID: {formation.status_id ?? "N/A"})</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Type d'offre :</strong> {formation.typeOffreLabel ?? "Non défini"} (ID: {formation.type_offre_id ?? "N/A"})</Typography>
          </Grid>

          {/* 📊 Détails */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">📊 Détails</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Produit :</strong> {formation.produit || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Numéro de produit :</strong> {formation.numProduit || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Numéro d'offre :</strong> {formation.numOffre || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Numéro Kairos :</strong> {formation.numKairos || "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date de début :</strong> {formation.dateDebut ? new Date(formation.dateDebut).toLocaleDateString() : "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date de fin :</strong> {formation.dateFin ? new Date(formation.dateFin).toLocaleDateString() : "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Assistante :</strong> {formation.assistante || "N/A"}</Typography>
          </Grid>

          {/* 📈 Effectifs */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold">📈 Effectifs</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Total places :</strong> {formation.totalPlaces ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Capacité :</strong> {formation.cap ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Prévu CRIF :</strong> {formation.prevusCrif ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Prévu MP :</strong> {formation.prevusMp ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>À recruter :</strong> {formation.aRecruter ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Inscrits CRIF :</strong> {formation.inscritsCrif ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Inscrits MP :</strong> {formation.inscritsMp ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Entrées Formation :</strong> {formation.entresFormation ?? "N/A"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Convocation envoyée :</strong> {formation.convocation_envoie ? "Oui" : "Non"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Dernière mise à jour :</strong> {formation.last_updated ? new Date(formation.last_updated).toLocaleDateString() : "N/A"}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
