import { Select, MenuItem, FormControl, InputLabel, CircularProgress, SelectChangeEvent } from "@mui/material";
import { useCentres } from "../hooks/useCentres";

interface CentreSelectProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export default function CentreSelect({ value, onChange }: CentreSelectProps) {
  const { data: centres, isLoading, error } = useCentres();

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value ? Number(event.target.value) : "");
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Centre de formation</InputLabel>
      <Select value={value.toString()} onChange={handleChange} disabled={isLoading || !!error}>
        {/* 📌 Option par défaut */}
        <MenuItem value="">🏫 Tous les centres</MenuItem>

        {/* ⏳ Affichage du chargement */}
        {isLoading && (
          <MenuItem disabled>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Chargement...
          </MenuItem>
        )}

        {/* ❌ Affichage de l'erreur */}
        {error && (
          <MenuItem disabled>
            ❌ Erreur de chargement
          </MenuItem>
        )}

        {/* 🔽 Liste des centres */}
        {centres?.map((centre) => (
          <MenuItem key={centre.id} value={centre.id.toString()}>
            {centre.nom}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
