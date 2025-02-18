import { Grid, Typography } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
}

/**
 * 🏷 `FormationDetailsInfo`
 * 📌 Affiche les détails (numéros, produit, dates, assistante).
 */
export function FormationDetailsInfo({ formation }: Props) {
  return (
    <Grid container spacing={2}>
      {/* 📦 Produit et numéros */}
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

      {/* 📅 Dates */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Date de début :</strong> {formation.dateDebut ? new Date(formation.dateDebut).toLocaleDateString() : "N/A"}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography><strong>Date de fin :</strong> {formation.dateFin ? new Date(formation.dateFin).toLocaleDateString() : "N/A"}</Typography>
      </Grid>

      {/* 👩 Assistante */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Assistante :</strong> {formation.assistante || "N/A"}</Typography>
      </Grid>
    </Grid>
  );
}
