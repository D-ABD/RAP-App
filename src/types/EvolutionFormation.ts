// 📌 Correspondance BDD : Table "evolution_formations"

import { TypeOffre } from "../hooks/useTypeOffre";
import { Centre } from "./Centres";

export interface EvolutionFormation {
  readonly id: number;  // Clé primaire dans la table "evolution_formations"
  formation_id: number;  // Référence à la formation concernée (clé étrangère vers "formations")
  centre_id: number;  // Référence à l'ID du centre de formation (clé étrangère vers "centres")
  centre?: Centre;  // Relation avec le centre
  produit: string;  // Produit ou programme associé à la formation
  numProduit: string;  // Numéro unique du produit
  numOffre: string;  // Numéro de l'offre de formation
  typeOffre: TypeOffre;  // Type d'offre (ex: CRIF, POEI, Alternance)

  semaine: number;  // Numéro de la semaine de l'année
  mois: number;  // Mois de l'année
  annee: number;  // Année de l'enregistrement

  totalPlaces: number;  // Nombre total de places disponibles
  cap: number;  // Nombre de places réservées
  prevusCrif: number;  // Nombre de participants attendus pour CRIF
  prevusMp: number;  // Nombre de participants attendus pour MP
  inscritsCrif: number;  // Nombre de participants inscrits pour CRIF
  inscritsMp: number;  // Nombre de participants inscrits pour MP
  aRecruter: number;  // Nombre de personnes restant à recruter
  entresFormation: number;  // Nombre de participants ayant intégré la formation

  tauxSaturation: number;  // ✅ Taux de remplissage (% de places occupées)
  tauxTransformation: number;  // ✅ % de candidats transformés en inscrits
  entretiens: number;  // Nombre d'entretiens réalisés
  candidats: number;  // Nombre de candidats intéressés
  evenements: number;  // Nombre d'événements organisés
  informationsCollectives: number;  // Nombre d'informations collectives organisées

  last_updated: Date;  // ✅ Stockage sous format `Date` pour meilleure gestion
  derniersCommentaires?: string[];  // ✅ Liste des derniers commentaires liés
}
