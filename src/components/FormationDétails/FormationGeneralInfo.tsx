import { Grid, Typography } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
}

/**
 * 🎓 `FormationGeneralInfo`
 * 📌 Affiche les informations générales d'une formation.
 */
export function FormationGeneralInfo({ formation }: Props) {
  return (
    <Grid container spacing={2}>
      {/* 📝 Nom de la formation */}
      <Grid item xs={12}>
        <Typography variant="h6"><strong>Nom :</strong> {formation.nom}</Typography>
      </Grid>

      {/* 🏫 Centre */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Centre :</strong> {formation.centre_nom ?? "Non défini"}</Typography>
      </Grid>

      {/* 🎭 Statut */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Statut :</strong> {formation.statusLabel ?? "Non défini"}</Typography>
      </Grid>

      {/* 🎓 Type d'offre */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Type d'offre :</strong> {formation.typeOffreLabel ?? "Non défini"}</Typography>
      </Grid>
    </Grid>
  );
}
