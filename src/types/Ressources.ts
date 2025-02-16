// 📌 Correspondance BDD : Table "ressources"

// 🏗 Interface pour les Ressources associées aux formations
// Permet de suivre l'évolution des ressources allouées à une formation (entretiens, candidats, taux de transformation, etc.)
// Relation directe avec l'évolution des statistiques liées à la formation.
export interface Ressources {
    readonly id: number;  // ID unique des ressources
    formation_id: number;  // Référence à la formation associée (clé étrangère vers "formations")
    semaine: number;  // Semaine de l'année où les ressources sont suivies
    mois: number;  // Mois de l'année
    annee: number;  // Année de l'enregistrement des ressources
    entretiens: number;  // Nombre d'entretiens réalisés durant la période
    candidats: number;  // Nombre de candidats intéressés durant la période
    tauxTransformation: number;  // Taux de transformation des candidats
    evenements: number;  // Nombre d'événements organisés durant la période
    informationsCollectives: number;  // Nombre d'informations collectives organisées
    last_updated: Date;  // Date de la dernière mise à jour des ressources
}
