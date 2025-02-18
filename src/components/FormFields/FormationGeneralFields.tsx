import { TextField, Grid } from "@mui/material";
import { NouvelleFormation } from "../../types/Formations";
import CentreSelect from "../CentreSelect";
import { StatusSelect } from "../StatusSelect";
import { TypeOffreSelect } from "../TypeOffreSelect";

interface Props {
  formData: NouvelleFormation;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  setFormData: React.Dispatch<React.SetStateAction<NouvelleFormation>>;
}

export function FormationGeneralFields({ formData, onChange, setFormData }: Props) {
  return (
    <Grid container spacing={2}>
      {/* 📝 Nom */}
      <Grid item xs={12}>
        <TextField fullWidth label="Nom de la formation" name="nom" value={formData.nom} onChange={onChange} required />
      </Grid>

      {/* 🏫 Centre */}
      <Grid item xs={12} sm={6}>
        <CentreSelect value={formData.centre_id || ""} onChange={(value) => setFormData((prev) => ({ ...prev, centre_id: value || undefined }))} />
      </Grid>

      {/* 🎭 Statut */}
      <Grid item xs={12} sm={6}>
        <StatusSelect value={formData.status_id || ""} onChange={(value) => setFormData((prev) => ({ ...prev, status_id: value || undefined }))} />
      </Grid>

      {/* 🎓 Type d'offre */}
      <Grid item xs={12} sm={6}>
        <TypeOffreSelect value={formData.type_offre_id || ""} onChange={(value) => setFormData((prev) => ({ ...prev, type_offre_id: value || undefined }))} />
      </Grid>
    </Grid>
  );
}
