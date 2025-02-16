// 📌 Correspondance BDD : Table "evenements"

// 🏗 Interface pour un événement lié à une formation
export interface Evenement {
    readonly id: number;  // Identifiant unique de l'événement
    formation_id: number;  // Référence à la formation concernée (clé étrangère vers "formations")
    type: string;  // Type d'événement (ex: "Session d'information")
    description?: string;  // Détails supplémentaires sur l'événement
    date_evenement: Date;  // Date de l'événement
    created_at: Date;  // Date de création de l'enregistrement
}
