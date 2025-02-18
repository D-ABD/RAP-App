import { Select, MenuItem, FormControl, InputLabel, CircularProgress, SelectChangeEvent } from "@mui/material";
import { useTypeOffres } from "../hooks/useTypeOffre";

interface TypeOffreSelectProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export function TypeOffreSelect({ value, onChange }: TypeOffreSelectProps) {
  const { data: typeOffres, isLoading, error } = useTypeOffres();

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value ? Number(event.target.value) : "");
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Type d'offre</InputLabel>
      <Select
        value={value.toString()}
        onChange={handleChange}
        label="Type d'offre"
        disabled={isLoading || !!error}
      >
        {/* 📌 Option par défaut */}
        <MenuItem value="">📚 Tous les types</MenuItem>

        {/* ⏳ Chargement */}
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Chargement...
          </MenuItem>
        )}

        {/* ❌ Erreur */}
        {error && (
          <MenuItem disabled>
            ❌ Erreur de chargement
          </MenuItem>
        )}

        {/* 🔽 Liste des types d'offres */}
        {typeOffres?.map((type) => (
          <MenuItem key={type.id} value={type.id.toString()}>
            {type.nom}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
