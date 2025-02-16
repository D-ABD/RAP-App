// 📌 Correspondance BDD : Table "centres"

// 🏗 Interface pour un centre de formation
export interface Centre {
    id: number;  // Identifiant unique du centre (clé primaire dans "centres")
    nom: string;  // Nom du centre de formation
    description?: string;  // Description optionnelle du centre
    adresse?: string;  // Adresse physique du centre
    last_updated: Date;  // Date de la dernière mise à jour du centre
}
  
// 🔹 Types pour CRUD Centre
export type NouveauCentre = Omit<Centre, "id" | "last_updated">;
export type MettreAJourCentre = Partial<Omit<Centre, "id">> & { id: number };
export type SupprimerCentre = Pick<Centre, "id">;
