import { Grid, TextField } from "@mui/material";
import { Formation } from "../../types/Formations";

interface Props {
  formation: Formation;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * 🏷 `FormationDetailsInfoEdit`
 * 📌 Permet de modifier les détails (numéros, produit, dates, assistante).
 */
export function FormationDetailsInfoEdit({ formation, onChange }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Produit" name="produit" value={formation.produit ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro de produit" name="numProduit" value={formation.numProduit ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro d'offre" name="numOffre" value={formation.numOffre ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Numéro Kairos" name="numKairos" value={formation.numKairos ?? ""} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth type="date" label="Date de début" name="dateDebut"
          value={formation.dateDebut ? new Date(formation.dateDebut).toISOString().split("T")[0] : ""}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth type="date" label="Date de fin" name="dateFin"
          value={formation.dateFin ? new Date(formation.dateFin).toISOString().split("T")[0] : ""}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Assistante" name="assistante" value={formation.assistante ?? ""} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
