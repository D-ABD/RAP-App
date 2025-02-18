import { Grid, TextField } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * 📊 `FormationEffectifsInfoEdit`
 * 📌 Permet de modifier les effectifs et capacités d'une formation.
 */
export function FormationEffectifsInfoEdit({ formation, onChange }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Total places" name="totalPlaces" type="number" value={formation.totalPlaces ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Capacité" name="cap" type="number" value={formation.cap ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Prévu CRIF" name="prevusCrif" type="number" value={formation.prevusCrif ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Prévu MP" name="prevusMp" type="number" value={formation.prevusMp ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="À recruter" name="aRecruter" type="number" value={formation.aRecruter ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Inscrits CRIF" name="inscritsCrif" type="number" value={formation.inscritsCrif ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Inscrits MP" name="inscritsMp" type="number" value={formation.inscritsMp ?? ""} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
