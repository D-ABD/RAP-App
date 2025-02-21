import { TextField, Grid, Button, Collapse } from "@mui/material";
import { useState } from "react";
import { NouvelleFormation } from "../../types/Formations";

interface Props {
  formData: NouvelleFormation;
  onChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

export function FormationInfoForm({ formData, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Button onClick={toggleAccordion} variant="outlined" sx={{ marginBottom: 2 }}>
        {isOpen ? "Masquer les détails" : "Afficher les détails de la formation"}
      </Button>
      <Collapse in={isOpen}>
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

          {/* Effectifs */}
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
      </Collapse>
    </>
  );
}
