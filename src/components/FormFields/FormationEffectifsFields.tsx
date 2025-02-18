import { TextField, Grid } from "@mui/material";
import { NouvelleFormation } from "../../types/Formations";

interface Props {
  formData: NouvelleFormation;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export function FormationEffectifsFields({ formData, onChange }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Total places" type="number" name="totalPlaces" value={formData.totalPlaces || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Capacité" type="number" name="cap" value={formData.cap || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Prévu CRIF" type="number" name="prevusCrif" value={formData.prevusCrif || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Prévu MP" type="number" name="prevusMp" value={formData.prevusMp || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="À recruter" type="number" name="aRecruter" value={formData.aRecruter || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Inscrits CRIF" type="number" name="inscritsCrif" value={formData.inscritsCrif || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Inscrits MP" type="number" name="inscritsMp" value={formData.inscritsMp || ""} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
