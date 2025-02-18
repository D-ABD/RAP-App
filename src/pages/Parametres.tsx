import { Container, Typography, Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import Centres from "../components/Centres"; // ✅ Importation du composant Centres

export default function Parametres() {
  // ✅ Gestion des onglets (ex: 0 = Général, 1 = Centres)
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxWidth="md">
      {/* 📌 Titre de la page */}
      <Typography variant="h4" gutterBottom>
        ⚙️ Paramètres de l'application
      </Typography>

      {/* 📌 Onglets pour organiser les paramètres */}
      <Paper elevation={3} sx={{ padding: 2 }}>
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} variant="fullWidth">
      <Tab label="Général" />
          <Tab label="Centres" /> {/* ✅ Ajout de l'onglet Centres */}
        </Tabs>
      </Paper>

      {/* 📌 Affichage du contenu en fonction de l'onglet sélectionné */}
      {tabIndex === 0 && (
        <Paper elevation={3} sx={{ padding: 4, marginTop: 2, textAlign: "center" }}>
          <Typography variant="h6" color="gray">
            🚧 Paramètres généraux en construction.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Ici, vous pourrez modifier les paramètres globaux de l'application.
          </Typography>
        </Paper>
      )}

      {tabIndex === 1 && <Centres />} {/* ✅ Affichage de la gestion des centres */}
    </Container>
  );
}
