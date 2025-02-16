import { useState } from "react";
import { Formation, NouvelleFormation } from "../types/Formations";
import { useCentres } from "../hooks/useCentres";
import { useStatuts } from "../hooks/useStatut";
import { useTypeOffres } from "../hooks/useTypeOffre";
import { Centre } from "../types/Centres";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  Alert,
  SelectChangeEvent,
} from "@mui/material";

interface FormData {
  id?: number;
  nom: string;
  centre_id?: number;
  dateDebut?: string | null;
  dateFin?: string | null;
  status_id?: number;
  type_offre_id?: number;
}

interface CreateFormationProps {
  onSubmit: (formation: NouvelleFormation) => Promise<void>;
  onCancel?: () => void;
  initialData?: Formation;
  isEditing?: boolean;
}

const defaultFormData: FormData = {
  nom: "",
  centre_id: undefined,
  dateDebut: null,
  dateFin: null,
  status_id: undefined,
  type_offre_id: undefined,
};

export function CreateFormation({ onSubmit, onCancel, initialData, isEditing = false }: CreateFormationProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData
      ? {
          ...defaultFormData,
          ...initialData,
          dateDebut: initialData.dateDebut ? new Date(initialData.dateDebut).toISOString().split("T")[0] : null,
          dateFin: initialData.dateFin ? new Date(initialData.dateFin).toISOString().split("T")[0] : null,
        }
      : defaultFormData
  );

  const [error, setError] = useState<string | null>(null);
  const { data: centres, isLoading: loadingCentres } = useCentres();
  const { data: statuts, isLoading: loadingStatuts } = useStatuts();
  const { data: typeOffres, isLoading: loadingTypeOffres } = useTypeOffres();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (!name) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value ? Number(value) : undefined,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (!name) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("date") && value ? (value as string) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.centre_id) {
      setError("Le centre de formation est obligatoire.");
      return;
    }
    if (!formData.nom.trim()) {
      setError("Le nom de la formation est obligatoire.");
      return;
    }

    const formationData: NouvelleFormation = {
      ...formData,
      dateDebut: formData.dateDebut ? new Date(formData.dateDebut) : null,
      dateFin: formData.dateFin ? new Date(formData.dateFin) : null,
    };

    console.log("🚀 Données finales envoyées :", formationData);
    await onSubmit(formationData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nom de la formation"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Centre de formation</InputLabel>
            <Select name="centre_id" value={formData.centre_id?.toString() || ""} onChange={handleSelectChange}>
              {loadingCentres ? (
                <MenuItem disabled>
                  <CircularProgress size={24} /> Chargement...
                </MenuItem>
              ) : (
                centres?.map((centre: Centre) => (
                  <MenuItem key={centre.id} value={centre.id.toString()}>
                    {centre.nom}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Statut</InputLabel>
            <Select name="status_id" value={formData.status_id?.toString() || ""} onChange={handleSelectChange}>
              {loadingStatuts ? (
                <MenuItem disabled>
                  <CircularProgress size={24} /> Chargement...
                </MenuItem>
              ) : (
                statuts?.map((statut) => (
                  <MenuItem key={statut.id} value={statut.id.toString()}>{statut.nom}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type d'offre</InputLabel>
            <Select name="type_offre_id" value={formData.type_offre_id?.toString() || ""} onChange={handleSelectChange}>
              {loadingTypeOffres ? (
                <MenuItem disabled>
                  <CircularProgress size={24} /> Chargement...
                </MenuItem>
              ) : (
                typeOffres?.map((type) => (
                  <MenuItem key={type.id} value={type.id.toString()}>{type.nom}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            {isEditing ? "Modifier" : "Ajouter"}
          </Button>
        </Grid>
        {isEditing && (
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="secondary" onClick={onCancel}>
              Annuler
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
