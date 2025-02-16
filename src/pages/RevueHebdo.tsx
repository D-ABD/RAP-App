import { useState } from "react";
import { useFormations } from "../hooks/useFormations";
import { useCentres } from "../hooks/useCentres";
import { useStatuts, getPastilleStatus } from "../hooks/useStatut";
import { Formation } from "../types/Formations";
import { useTypeOffres } from "../hooks/useTypeOffre";

export default function RevueHebdo() {
  const { data: formations, isLoading, error } = useFormations();
  const { data: centres } = useCentres();
  const { data: statuts } = useStatuts();
  const { data: typeOffres } = useTypeOffres(); // 🔄 Récupération dynamique des types d'offres

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<number | "">("");
  const [selectedTypeOffre, setSelectedTypeOffre] = useState<number | "">(""); // 🔄 Maintenant un `number`
  const [selectedCentre, setSelectedCentre] = useState<number | "">("");

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  // 🎯 Filtres dynamiques
  const filteredFormations = formations?.filter((formation: Formation) =>
    (search ? formation.nom.toLowerCase().includes(search.toLowerCase()) : true) &&
    (selectedStatus ? formation.status_id === selectedStatus : true) &&
    (selectedTypeOffre ? formation.type_offre_id === selectedTypeOffre : true) && // 🔄 Comparaison avec `type_offre_id`
    (selectedCentre ? formation.centre_id === selectedCentre : true)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Revue Hebdomadaire des Formations</h1>

      {/* 🔍 Barre de Recherche */}
      <input
        type="text"
        placeholder="Rechercher une formation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {/* 🎯 Filtres */}
      <div className="flex gap-4 mb-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(Number(e.target.value) || "")}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">📌 Tous les statuts</option>
          {statuts?.map((statut) => (
            <option key={statut.id} value={statut.id}>
              {getPastilleStatus(statut.nom)}
            </option>
          ))}
        </select>

        <select
          value={selectedTypeOffre}
          onChange={(e) => setSelectedTypeOffre(Number(e.target.value) || "")} // 🔄 Convertir en `number`
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">📁 Tous les types</option>
          {typeOffres?.map((type) => (
            <option key={type.id} value={type.id}>{type.nom}</option> // 🔄 Utilisation dynamique
          ))}
        </select>

        <select
          value={selectedCentre}
          onChange={(e) => setSelectedCentre(Number(e.target.value) || "")}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">🏫 Tous les centres</option>
          {centres?.map((centre) => (
            <option key={centre.id} value={centre.id}>
              {centre.nom}
            </option>
          ))}
        </select>
      </div>

      {/* 📋 Liste des Formations */}
      <ul className="bg-white shadow rounded-lg p-4">
        {filteredFormations?.length === 0 ? (
          <p className="text-center text-gray-500">Aucune formation trouvée.</p>
        ) : (
          filteredFormations?.map((formation) => (
            <li key={formation.id} className="border-b p-4 last:border-b-0 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{formation.nom}</h2>
                <p className="text-sm text-gray-500">{formation.centre?.nom}</p>
                <p className="text-sm">{getPastilleStatus(statuts?.find(s => s.id === formation.status_id)?.nom || "")}</p>
              </div>
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  {typeOffres?.find(t => t.id === formation.type_offre_id)?.nom || "Inconnu"} {/* 🔄 Conversion dynamique */}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
