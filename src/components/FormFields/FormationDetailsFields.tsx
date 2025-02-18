import { TextField, Grid } from "@mui/material";
import { NouvelleFormation } from "../../types/Formations";

interface Props {
  formData: NouvelleFormation;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export function FormationDetailsFields({ formData, onChange }: Props) {
  return (
    <Grid container spacing={2}>
      {/* 📦 Produit et numéros */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Produit" name="produit" value={formData.produit || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro de produit" name="numProduit" value={formData.numProduit || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro d'offre" name="numOffre" value={formData.numOffre || ""} onChange={onChange} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro Kairos" name="numKairos" value={formData.numKairos || ""} onChange={onChange} />
      </Grid>

      {/* 📅 Dates */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Date de début" type="date" name="dateDebut"
          value={formData.dateDebut ? new Date(formData.dateDebut).toISOString().split("T")[0] : ""}
          onChange={onChange} InputLabelProps={{ shrink: true }} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Date de fin" type="date" name="dateFin"
          value={formData.dateFin ? new Date(formData.dateFin).toISOString().split("T")[0] : ""}
          onChange={onChange} InputLabelProps={{ shrink: true }} />
      </Grid>

      {/* 👩 Assistante */}
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Assistante" name="assistante" value={formData.assistante || ""} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
