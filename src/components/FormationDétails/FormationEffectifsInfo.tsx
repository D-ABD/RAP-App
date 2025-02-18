import { Grid, Typography } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
}

/**
 * 📊 `FormationEffectifsInfo`
 * 📌 Affiche les effectifs et capacités.
 */
export function FormationEffectifsInfo({ formation }: Props) {
  return (
    <Grid container spacing={2}>
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
  );
}
