import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  value: string; // 🔍 Valeur actuelle du champ de recherche
  onChange: Dispatch<SetStateAction<string>>; // 🔄 Fonction pour mettre à jour la valeur
  placeholder?: string; // ℹ️ Texte indicatif optionnel à afficher dans le champ
}

/**
 * Composant `SearchInput`
 * -------------------------
 * 📌 Champ de recherche réutilisable basé sur `TextField` de Material-UI.
 * 🔄 Gère la mise à jour de la valeur et l'affiche dans un champ stylisé.
 * 🎨 Inclut une icône "🔍" pour indiquer visuellement son rôle.
 */
export function SearchInput({ value, onChange, placeholder = "Rechercher..." }: SearchInputProps) {
  return (
    <TextField
      fullWidth // 🖥️ Occupe toute la largeur disponible
      value={value} // 🔄 Contenu du champ de recherche
      onChange={(e) => onChange(e.target.value)} // 📝 Met à jour la valeur au fur et à mesure de la saisie
      placeholder={placeholder} // ℹ️ Affiche un texte indicatif si le champ est vide
      variant="outlined" // 🎨 Style du champ (bordure grise autour)
      InputProps={{
        startAdornment: "🔍", // 🔍 Ajoute une icône au début du champ
      }}
    />
  );
}
