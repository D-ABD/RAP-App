import { Grid, Typography, Paper } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
}

/**
 * 📌 `FormationInfo`
 * 🎓 Affiche toutes les informations générales, détails et effectifs d'une formation.
 */
export function FormationInfo({ formation }: Props) {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📄 Informations de la Formation
      </Typography>

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
          <Typography><strong>Statut :</strong> {formation.statusLabel ?? "Non défini"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Type d'offre :</strong> {formation.typeOffreLabel ?? "Non défini"}</Typography>
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
      </Grid>
    </Paper>
  );
}
