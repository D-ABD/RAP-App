import { useState, useEffect } from "react"; // Hook pour gérer l'état local
import { useFormations } from "../hooks/useFormations"; // Hook personnalisé pour récupérer les formations
import { useFilterFormations } from "../hooks/useFilterFormations"; // Hook personnalisé pour filtrer les formations
import { useNavigate } from "react-router-dom"; // Hook pour la navigation entre les pages

// Importation des composants Material-UI
import { 
  Card,           // Composant pour créer une carte
  CardContent,    // Contenu de la carte
  Typography,     // Composant pour le texte
  Box,           // Conteneur flexible
  Button,        // Bouton
  Grid,          // Système de grille
  Chip,          // Étiquette
  CircularProgress, // Indicateur de chargement
  Pagination,     // Pagination
  TextField       // Champ de saisie de texte
} from "@mui/material";

// Interface TypeScript définissant la structure des props du composant
interface FormationListFiltreProps {
  filters: {
    search: string;               // Texte de recherche
    status_id: number | "";       // ID du statut (peut être un nombre ou une chaîne vide)
    type_offre_id: number | "";   // ID du type d'offre
    centre_id: number | "";       // ID du centre
    dateDebut: string | "";  // Ajout des filtres de date
    dateFin: string | "";    // Ajout des filtres de date
  };
}

// Composant principal
export default function FormationListFiltre({ filters }: FormationListFiltreProps) {
  // Hook de navigation React Router
  const navigate = useNavigate();

  // Récupération des données avec le hook personnalisé useFormations
  // data: les formations, isLoading: état de chargement, error: erreurs éventuelles
  const { data: formations = [], isLoading, error } = useFormations();

  // Gestion des filtres (état local)
  const [localFilters, setLocalFilters] = useState(filters);

  // Filtrage des formations selon les critères
  const filteredFormations = useFilterFormations(formations, localFilters);

  // Configuration de la pagination
  const [page, setPage] = useState(1); // État local pour la page courante
  const itemsPerPage = 6; // Nombre d'éléments par page
  const totalPages = Math.ceil(filteredFormations.length / itemsPerPage); // Calcul du nombre total de pages

  // Sélection des formations à afficher pour la page courante
  const displayedFormations = filteredFormations.slice(
    (page - 1) * itemsPerPage, // Index de début
    page * itemsPerPage        // Index de fin
  );

  // Effet pour réinitialiser la page à 1 lorsque les filtres changent
  useEffect(() => {
    setPage(1); // Reset de la page
  }, [localFilters]);

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress />
      </Box>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <Typography color="error" variant="h6" textAlign="center" mt={4}>
        ❌ Erreur : {error.message}
      </Typography>
    );
  }

  // Affichage si aucune formation n'existe
  if (!formations.length) {
    return (
      <Typography color="textSecondary" variant="h6" textAlign="center" mt={4}>
        📭 Aucune formation disponible.
      </Typography>
    );
  }

  // Affichage si aucune formation ne correspond aux filtres
  if (filteredFormations.length === 0) {
    return (
      <Typography color="textSecondary" variant="h6" textAlign="center" mt={4}>
        🔍 Aucune formation ne correspond aux critères de recherche.
      </Typography>
    );
  }

  // Gestion des filtres de dates
  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    filterName: "dateDebut" | "dateFin"
  ) => {
    if (e.target instanceof HTMLInputElement) {
      setLocalFilters(prevFilters => ({
        ...prevFilters,
        [filterName]: e.target.value // Mise à jour dynamique du filtre de date
      }));
    }
  };
  

  // Rendu principal du composant
  return (
    <Box>
      {/* Grille de cartes de formations */}
      <Grid container spacing={3}>
        {displayedFormations.map((formation) => (
          // Chaque formation occupe une cellule de la grille
          <Grid item xs={12} sm={6} md={4} key={formation.id}>
            {/* Carte Material-UI avec animation au survol */}
            <Card sx={{ 
              p: 2, // padding de 2 unités
              boxShadow: 3, // ombre portée niveau 3
              transition: "0.3s", // animation de transition
              "&:hover": { boxShadow: 6 } // ombre plus prononcée au survol
            }}>
              <CardContent>
                {/* Titre de la formation */}
                <Typography variant="h6" fontWeight="bold">
                  {formation.nom}
                </Typography>

                {/* Filtre par dates */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Date de début"
                      type="date"
                      value={localFilters.dateDebut}
                      onChange={(e) => handleDateChange(e, "dateDebut")}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Date de fin"
                      type="date"
                      value={localFilters.dateFin}
                      onChange={(e) => handleDateChange(e, "dateFin")}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>

                {/* Nom du centre */}
                <Typography variant="body2" color="textSecondary">
                  📍 {formation.centre_nom || "Centre non défini"}
                </Typography>

                {/* Date de début (si elle existe) */}
                {formation.dateDebut && (
                  <Typography variant="body2" color="textSecondary">
                    🗓 {new Date(formation.dateDebut).toLocaleDateString("fr-FR")}
                  </Typography>
                )}

                {/* A recruter */}
                <Typography variant="h6" fontWeight="bold">
                  {formation.aRecruter}
                </Typography>

                {/* Places totales */}
                <Typography variant="h6" fontWeight="bold">
                  {formation.totalPlaces}
                </Typography>

                {/* Étiquettes de statut et type d'offre */}
                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip 
                    label={formation.statusLabel} 
                    color="primary" 
                    variant="outlined" 
                  />
                  <Chip 
                    label={formation.typeOffreLabel} 
                    color="success" 
                    variant="outlined" 
                  />
                </Box>

                {/* Bouton de modification */}
                <Box mt={3}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    onClick={() => navigate(`/formations/${formation.id}/edit`)}
                  >
                    ✏️ Modifier
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Composant de pagination (affiché uniquement s'il y a plus d'une page) */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}        // Nombre total de pages
            page={page}               // Page courante
            onChange={(_, value) => setPage(value)} // Fonction de changement de page
            color="primary"           // Couleur des boutons
          />
        </Box>
      )}
    </Box>
  );
}
