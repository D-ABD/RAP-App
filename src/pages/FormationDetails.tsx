import { useParams } from "react-router-dom";
import { useFormations } from "../hooks/useFormations";
import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import { FormationGeneralInfo } from "../components/FormationDétails/FormationGeneralInfo";
import { FormationEffectifsInfo } from "../components/FormationDétails/FormationEffectifsInfo";
import { FormationDetailsInfo } from "../components/FormationDétails/FormationDetailsInfo";

export default function FormationDetails() {
  const { id } = useParams<{ id: string }>(); // 🔍 Récupère l'ID de l'URL
  const { data: formations, isLoading, error } = useFormations();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">❌ Erreur : {error.message}</Typography>;

  // 🔎 Recherche de la formation par ID
  const formation = formations?.find((f) => f.id === Number(id));

  if (!formation) return <Typography>❌ Formation non trouvée.</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>📋 Détails de la formation</Typography>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <FormationGeneralInfo formation={formation} />
        <FormationDetailsInfo formation={formation} />
        <FormationEffectifsInfo formation={formation} />
      </Paper>
    </Container>
  );
}
