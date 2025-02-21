import { useState, useEffect } from "react";
import { Button, Grid, Alert, Snackbar } from "@mui/material";
import { useAddFormation } from "../hooks/useFormations";
import { useUpdateFormation } from "../hooks/updateFormation";
import { Formation, NouvelleFormation } from "../types/Formations";
import { FormationGeneralFields } from "../components/FormFields/FormationGeneralFields";
import { FormationInfoForm } from "../components/FormFields/FormationInfoForm";

interface CreateFormationProps {
  onSuccess?: () => void;
  initialData?: Formation;
}

const defaultFormData: NouvelleFormation = {
  nom: "",
  centre_id: undefined,
  dateDebut: null,
  dateFin: null,
  status_id: undefined,
  type_offre_id: undefined,
};

export function CreateFormation({ onSuccess, initialData }: CreateFormationProps) {
  const [formData, setFormData] = useState<NouvelleFormation>(defaultFormData);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoForm, setShowInfoForm] = useState(false); // ✅ État pour afficher `FormationInfoForm`

  const addFormation = useAddFormation();
  const updateFormation = useUpdateFormation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData,
        dateDebut: initialData.dateDebut ? new Date(initialData.dateDebut) : null,
        dateFin: initialData.dateFin ? new Date(initialData.dateFin) : null,
      });
    }
  }, [initialData]);

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

    try {
      setIsLoading(true);
      if (initialData) {
        await updateFormation.mutateAsync({ id: initialData.id, ...formData });
        setSuccessMessage("✅ Formation mise à jour avec succès !");
      } else {
        await addFormation.mutateAsync(formData);
        setSuccessMessage("✅ Formation ajoutée avec succès !");
      }

      onSuccess?.();
    } catch (error) {
      console.error("❌ Erreur lors de la soumission de la formation :", error);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
      />

      {/* 🎯 Première partie du formulaire */}
      <FormationGeneralFields formData={formData} onChange={handleInputChange} setFormData={setFormData} />

      {/* 🎯 Bouton pour afficher la suite */}
      {!showInfoForm && (
        <Button variant="contained" color="primary" onClick={() => setShowInfoForm(true)} fullWidth>
          Suite
        </Button>
      )}

      {/* 🎯 Deuxième partie du formulaire */}
      {showInfoForm && <FormationInfoForm formData={formData} onChange={handleInputChange} />}

      {/* 🎯 Boutons d'action */}
      <Grid container spacing={2} mt={2}>
        {showInfoForm && (
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" onClick={() => setShowInfoForm(false)}>
              Retour
            </Button>
          </Grid>
        )}
        {showInfoForm && (
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="success" type="submit" disabled={isLoading}>
              {isLoading ? "En cours..." : initialData ? "Modifier" : "Ajouter"}
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
