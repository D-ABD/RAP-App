import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import RevueHebdo from "./pages/RevueHebdo";
import Centres from "./components/Centres";
import FormationDetails from "./pages/FormationDetails";
import Formations from "./pages/Formations";
import Mgo from "./pages/Mgo";
import Parametres from "./pages/Parametres";
import FormationDetailsEditable from "./pages/FormationDetailsEditable";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/revue-hebdo" element={<RevueHebdo />} />
      <Route path="/centres" element={<Centres />} />
      <Route path="/formations" element={<Formations />} />
      <Route path="/mgo" element={<Mgo />} />
      <Route path="/formation/:id" element={<FormationDetails />} />
      <Route path="/formations/:id/edit" element={<FormationDetailsEditable />} />
      <Route path="/parametres" element={<Parametres />} />
      
      {/* Redirection si la route n'existe pas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;
