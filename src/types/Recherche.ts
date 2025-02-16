// 📌 Correspondance BDD : Requête dynamique sur "formations"

import { TypeOffre } from "../hooks/useTypeOffre";



// 🎯 Critères de recherche pour une formation
export interface CritèresRechercheFormation {
    nom?: string;  // Recherche par nom de la formation
    centre_id?: number;  // Recherche par centre de formation spécifique (clé étrangère vers "centres")
    typeOffre?: TypeOffre;  // Recherche par type d'offre de formation (ex: CRIF, POEI)
    status_id?: number; // 🔄 Remplacement de status par status_id
    dateDebut?: Date;  // Recherche par date de début
    dateFin?: Date;  // Recherche par date de fin
    aRecruter?: boolean;  // Recherche si la formation nécessite des recruteurs
    complet?: boolean;  // Recherche si la formation est complète
    abandonnee?: boolean;  // Recherche si la formation a été abandonnée
  }
  
  // 🔹 Interface pour la pagination
  export interface Pagination {
    page: number;  // Numéro de la page actuelle
    pageSize: number;  // Nombre d'éléments affichés par page
    totalItems: number;  // Nombre total d'éléments dans la recherche
    totalPages: number;  // Nombre total de pages disponibles
  }