import { useState, useEffect } from "react";
import { useAddFormation } from "../hooks/useFormations";
import { Formation, NouvelleFormation } from "../types/Formations";
import { Button, Grid, Alert, Snackbar } from "@mui/material";
import { FormationGeneralFields } from "./FormFields/FormationGeneralFields";
import { FormationDetailsFields } from "./FormFields/FormationDetailsFields";
import { FormationEffectifsFields } from "./FormFields/FormationEffectifsFields";
import { useUpdateFormation } from "../hooks/updateFormation";

interface CreateFormationProps {
  onSuccess?: () => void; // ✅ Callback exécuté après une soumission réussie
  initialData?: Formation; // ✅ Données initiales en mode édition
}

/**
 * 📌 Valeurs par défaut du formulaire pour éviter les erreurs d'initialisation.
 */
const defaultFormData: NouvelleFormation = {
  nom: "",
  centre_id: undefined,
  dateDebut: null,
  dateFin: null,
  status_id: undefined,
  type_offre_id: undefined,
};

/**
 * 🎓 `CreateFormation`
 * ---------------------
 * 📌 Gère l'ajout et la modification d'une formation.
 * 📌 Utilise des sous-composants (`FormationGeneralFields`, `FormationDetailsFields`, `FormationEffectifsFields`)
 *    pour séparer les champs et rendre le code plus lisible et modulaire.
 */
export function CreateFormation({ onSuccess, initialData }: CreateFormationProps) {
  // 📝 État local pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState<NouvelleFormation>(defaultFormData);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔄 Récupération des mutations pour ajouter ou mettre à jour une formation
  const addFormation = useAddFormation();
  const updateFormation = useUpdateFormation();

  /**
   * 📌 Effet qui initialise les valeurs du formulaire en mode édition.
   * - Si `initialData` est fournie, on remplit le formulaire avec ces valeurs.
   * - Conversion des dates `Date` en `null` pour éviter les erreurs.
   */
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultFormData,
        ...initialData,
        dateDebut: initialData.dateDebut ? new Date(initialData.dateDebut) : null, // ✅ Convertit `dateDebut` en `Date`
        dateFin: initialData.dateFin ? new Date(initialData.dateFin) : null, // ✅ Convertit `dateFin` en `Date`
      });
    }
  }, [initialData]);

  /**
   * 📌 Gestion des changements dans les champs du formulaire.
   * - Met à jour `formData` à chaque modification de champ.
   * - Convertit les champs `date` en `string` pour éviter les erreurs.
   */
  const handleInputChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (!name) return;

    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("date") && value ? (value as string) : value, // ✅ Convertit les dates en string
    }));
  };

  /**
   * 📌 Gestion de la soumission du formulaire.
   * - Vérifie que les champs obligatoires sont remplis.
   * - Exécute `useAddFormation` ou `useUpdateFormation` selon le mode (ajout/modification).
   * - Déclenche `onSuccess()` si tout se passe bien.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚨 Vérification des champs obligatoires
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
        // ✏️ Mode édition : Mise à jour de la formation existante
        await updateFormation.mutateAsync({ id: initialData.id, ...formData });
        setSuccessMessage("✅ Formation mise à jour avec succès !");
      } else {
        // 🆕 Mode création : Ajout d'une nouvelle formation
        await addFormation.mutateAsync(formData);
        setSuccessMessage("✅ Formation ajoutée avec succès !");
      }

      onSuccess?.(); // ✅ Exécute le callback après soumission réussie
    } catch (error) {
      console.error("❌ Erreur lors de la soumission de la formation :", error);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 🚨 Affichage des erreurs */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* ✅ Affichage du message de succès */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
      />

      {/* 📌 Champs du formulaire divisés en plusieurs sections */}
      <FormationGeneralFields formData={formData} onChange={handleInputChange} setFormData={setFormData} />
      <FormationDetailsFields formData={formData} onChange={handleInputChange} />
      <FormationEffectifsFields formData={formData} onChange={handleInputChange} />

      {/* 🎯 Boutons d'action */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? "En cours..." : initialData ? "Modifier" : "Ajouter"}
          </Button>
        </Grid>
        {initialData && (
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="secondary" onClick={onSuccess}>
              Annuler
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
