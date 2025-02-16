# Correspondance Typescript - Base de données

| TypeScript             | Table Supabase       | Clé primaire | Clés étrangères |
|------------------------|---------------------|--------------|----------------|
| `Formation`           | `formations`        | `id`         | `centre_id`    |
| `Centre`              | `centres`           | `id`         | -              |
| `Commentaire`         | `commentaires`      | `id`         | `formation_id` |
| `EvolutionFormation`  | `evolution_formations` | `id`     | `formation_id`, `centre_id` |
| `Ressources`          | `ressources`        | `id`         | `formation_id` |
| `Evenement`           | `evenements`        | `id`         | `formation_id` |

Chaque table Supabase correspond à une interface TypeScript, facilitant ainsi la manipulation des données.
