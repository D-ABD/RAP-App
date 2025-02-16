// 📌 Correspondance BDD : Table "centres"

// 🏗 Interface pour un centre de formation
export interface Centre {
  readonly id: number;  // Identifiant unique du centre (clé primaire dans "centres")
  nom: string;  // Nom du centre de formation
  description?: string;  // Description optionnelle du centre
  adresse?: string;  // Adresse physique du centre
  last_updated: Date;  // Date de la dernière mise à jour du centre
}

// 🔹 Types pour CRUD Centre
export type NouveauCentre = Omit<Centre, "id" | "last_updated">;
export type MettreAJourCentre = Partial<Omit<Centre, "id">> & { id: number };
export type SupprimerCentre = Pick<Centre, "id">;

// 📌 Correspondance BDD : Table "commentaires"

// 🏗 Interface pour un commentaire associé à une formation
export interface Commentaire {
  readonly id: number;  // Identifiant unique du commentaire
  readonly formation_id: number;  // Référence à la formation concernée (clé étrangère vers "formations")
  text: string;  // Contenu du commentaire
  created_at: Date;  // Date de création du commentaire
  parent_id?: number | null;  // Référence à un commentaire parent (si réponse)
  author_id: string;  // Identifiant de l'auteur du commentaire
}

// ➕ Types pour CRUD commentaire
export type NouveauCommentaire = Omit<Commentaire, "id" | "created_at">;
export type ModifierCommentaire = Pick<Commentaire, "id" | "text">;
export type SupprimerCommentaire = Pick<Commentaire, "id">;
