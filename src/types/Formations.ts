import { Centre } from "./Centres";

export interface Formation {
  readonly id: number;
  nom: string;
  centre_id?: number;
  centre_nom?: string;
  centre?: Centre | null;
  status_id?: number;
  type_offre_id?: number;
  produit?: string;
  numProduit?: string;
  numOffre?: string;
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
  // Nouveaux champs pour les labels
  statusLabel?: string;
  typeOffreLabel?: string;
}

export type NouvelleFormation = Omit<Formation, "id">;
export type ModifierFormation = Partial<Omit<Formation, "id">> & { id: number };
export type SupprimerFormation = Pick<Formation, "id">;