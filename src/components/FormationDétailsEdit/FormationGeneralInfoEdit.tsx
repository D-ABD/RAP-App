import { Grid, Typography, TextField } from "@mui/material";
import { Formation } from "../../types/Formations";
import { StatusSelect } from "../StatusSelect";
import { TypeOffreSelect } from "../TypeOffreSelect";

interface Props {
  formation: Formation;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (field: keyof Formation, value: number | "") => void;
}

/**
 * 🎓 `FormationGeneralInfoEdit`
 * 📌 Formulaire permettant la modification des infos générales d'une formation.
 */
export function FormationGeneralInfoEdit({ formation, onChange, onSelectChange }: Props) {
  return (
    <Grid container spacing={2}>
      {/* 📝 Nom de la formation */}
      <Grid item xs={12}>
        <Typography variant="h6"><strong>Nom :</strong></Typography>
        <TextField
          fullWidth
          variant="outlined"
          name="nom"
          value={formation.nom || ""}
          onChange={onChange}
        />
      </Grid>

      {/* 🏫 Centre (Non modifiable après création) */}
      <Grid item xs={12} sm={6}>
        <Typography><strong>Centre :</strong> {formation.centre_nom ?? "Non défini"}</Typography>
      </Grid>

      {/* 🎭 Statut */}
      <Grid item xs={12} sm={6}>
        <StatusSelect
          value={formation.status_id ?? ""}
          onChange={(value) => onSelectChange("status_id", value)}
        />
      </Grid>

      {/* 🎓 Type d'offre */}
      <Grid item xs={12} sm={6}>
        <TypeOffreSelect
          value={formation.type_offre_id ?? ""}
          onChange={(value) => onSelectChange("type_offre_id", value)}
        />
      </Grid>
    </Grid>
  );
}
