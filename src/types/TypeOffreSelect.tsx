import { Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { useTypeOffres } from "../hooks/useTypeOffre";

interface TypeOffreSelectProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export function TypeOffreSelect({ value, onChange }: TypeOffreSelectProps) {
  const { data: typeOffres, isLoading, error } = useTypeOffres();

  if (isLoading) return <CircularProgress size={24} />;
  if (error) return <p>❌ Erreur : {error.message}</p>;

  return (
    <FormControl fullWidth>
      <InputLabel>Type d'offre</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || "")}
      >
        <MenuItem value="">📁 Tous les types</MenuItem>
        {typeOffres?.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.nom}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
