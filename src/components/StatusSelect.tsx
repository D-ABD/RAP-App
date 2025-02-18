import { Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { useStatuts, getPastilleStatus } from "../hooks/useStatut";

interface StatusSelectProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  const { data: statuts, isLoading, error } = useStatuts();

  return (
    <FormControl fullWidth>
      <InputLabel>Statut</InputLabel>
      <Select
        value={value.toString()}
        onChange={(e) => onChange(Number(e.target.value) || "")}
        disabled={isLoading || !!error}
      >
        {/* 📌 Option par défaut */}
        <MenuItem value="">📌 Tous les statuts</MenuItem>

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

        {/* 🔽 Liste des statuts */}
        {statuts?.map((statut) => (
          <MenuItem key={statut.id} value={statut.id}>
            {getPastilleStatus(statut.nom)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
