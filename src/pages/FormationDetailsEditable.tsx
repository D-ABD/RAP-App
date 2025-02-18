import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormations } from "../hooks/useFormations";
import { Container, Typography, Paper, Button, Alert, Snackbar } from "@mui/material";
import { Formation } from "../types/Formations";
import { FormationEffectifsInfoEdit } from "../components/FormationDétailsEdit/FormationEffectifsInfoEdit";
import { FormationDetailsInfoEdit } from "../components/FormationDétailsEdit/FormationDetailsInfoEdit";
import { FormationGeneralInfoEdit } from "../components/FormationDétailsEdit/FormationGeneralInfoEdit";
import { useUpdateFormation } from "../hooks/updateFormation";

export default function FormationDetailsEditable() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: formations } = useFormations();
  const updateFormation = useUpdateFormation();

  const [formData, setFormData] = useState<Formation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // 📌 Charger la formation à modifier
  useEffect(() => {
    if (formations) {
      const foundFormation = formations.find((f) => f.id === Number(id));
      if (foundFormation) setFormData(foundFormation);
    }
  }, [formations, id]);

  // 📌 Gérer la modification des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : null);
    setHasChanges(true);
  };

  // 📌 Gérer les changements des `Select`
  const handleSelectChange = (field: keyof Formation, value: number | "") => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
    setHasChanges(true);
  };

  // 📌 Validation des champs obligatoires
  const validateForm = useCallback((): boolean => {
    if (!formData) return false;
    if (!formData.nom.trim()) {
      setError("Le nom de la formation est obligatoire.");
      return false;
    }
    if (!formData.centre_id) {
      setError("Le centre de formation est obligatoire.");
      return false;
    }
    return true;
  }, [formData]);

  // 📌 Gérer la soumission du formulaire
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await updateFormation.mutateAsync(formData!);
      setSuccessMessage("✅ Formation mise à jour avec succès !");
      setError(null);
      setHasChanges(false);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, updateFormation, validateForm]);

  // 📌 Enregistrement automatique après modification
  useEffect(() => {
    if (hasChanges) {
      const timeout = setTimeout(() => {
        if (validateForm()) {
          handleSubmit();
        }
      }, 2000); // ⏳ Enregistre après 2 secondes

      return () => clearTimeout(timeout);
    }
  }, [formData, hasChanges, handleSubmit, validateForm]);

  // 📌 Demander confirmation avant de quitter si modifications non enregistrées
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  // 📌 Empêcher la navigation si des modifications non enregistrées existent
  useEffect(() => {
    const handleNavigateAway = () => { 
      if (hasChanges && !window.confirm("Vous avez des modifications non enregistrées. Voulez-vous quitter cette page ?")) {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleNavigateAway);
    return () => window.removeEventListener("popstate", handleNavigateAway);
  }, [hasChanges]);

  if (!formData) return <Typography>❌ Formation non trouvée.</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4">✏️ Modifier la formation</Typography>
      <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
        {/* 🚨 Affichage des erreurs */}
        {error && <Alert severity="error">{error}</Alert>}
        {successMessage && <Snackbar open autoHideDuration={3000} message={successMessage} onClose={() => setSuccessMessage(null)} />}

        {/* 🟡 Indicateur de modifications en cours */}
        {hasChanges && <Alert severity="warning">🟡 Modifications en cours...</Alert>}

        {/* 📌 Formulaires des différentes sections */}
        <FormationGeneralInfoEdit formation={formData} onChange={handleChange} onSelectChange={handleSelectChange} />
        <FormationDetailsInfoEdit formation={formData} onChange={handleChange} />
        <FormationEffectifsInfoEdit formation={formData} onChange={handleChange} />

        {/* 🎯 Boutons d'action */}
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
          {isLoading ? "Enregistrement..." : "💾 Enregistrer"}
        </Button>
        <Button onClick={() => navigate(`/formations/${id}`)} variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }}>
          ❌ Annuler
        </Button>
      </Paper>
    </Container>
  );
}
