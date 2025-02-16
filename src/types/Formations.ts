import { Centre } from "./Centres";

// 📌 Correspondance BDD : Table "formations"

// 🏗 Interface pour une formation complète
export interface Formation {
  readonly id: number;  // Non nullable
  nom: string;  // Non nullable
  centre_id?: number;
  centre?: Centre;
  status_id?: number; // 🔄 Remplacement de status par status_id
  produit?: string;
  numProduit?: string;
  numOffre?: string;
  type_offre_id?: number; // ✅ Correction : Stocker l'ID du type d'offre
  dateDebut?: Date | null;
  dateFin?: Date | null;
  totalPlaces?: number;
  cap?: number;
  prevusCrif?: number;
  prevusMp?: number;
  aRecruter?: number;
  inscritsCrif?: number;
  inscritsMp?: number;
  numKairos?: string;
  entresFormation?: number;
  convocation_envoie?: boolean;
  assistante?: string;
  last_updated?: Date | null;
}

// 🔹 Types pour CRUD Formation
export type NouvelleFormation = Omit<Formation, "id">;
export type ModifierFormation = Partial<Omit<Formation, "id">> & { id: number };  // Mise à jour partielle d'une formation existante
export type SupprimerFormation = Pick<Formation, "id">;  // Suppression d'une formation (requiert uniquement l'ID)

// 📌 Correspondance BDD : Pagination sur les formations

// 🎯 Interface pour gérer la pagination des résultats de formations
export interface Pagination {
  page: number;  // Numéro de la page actuelle
  pageSize: number;  // Nombre d'éléments affichés par page
  totalItems: number;  // Nombre total d'éléments dans la recherche
  totalPages: number;  // Nombre total de pages disponibles
}

// 🔹 Interface combinée : Formations paginées
export interface FormationsAvecPagination {
  formations: Formation[];  // Liste des formations récupérées
  pagination: Pagination;  // Données de pagination
}
