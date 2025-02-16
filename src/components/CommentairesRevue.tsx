import { useState } from "react";
import { useCommentaires, useAddCommentaire, useUpdateCommentaire, useDeleteCommentaire } from "../hooks/useCommentaires";
import { Commentaire } from "../types/Commentaires";

interface CommentairesRevueProps {
  formationId: number;
}

export default function CommentairesRevue({ formationId }: CommentairesRevueProps) {
  const { data: commentaires = [], isLoading } = useCommentaires(formationId); // ✅ Par défaut, un tableau vide
  const addCommentaire = useAddCommentaire();
  const updateCommentaire = useUpdateCommentaire();
  const deleteCommentaire = useDeleteCommentaire();

  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const [modeEdition, setModeEdition] = useState<{ id: number | null; text: string }>({ id: null, text: "" });
  const [afficherHistorique, setAfficherHistorique] = useState(false);

  // ✅ Ajouter un commentaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauCommentaire.trim()) return;

    addCommentaire.mutate(
      { formation_id: formationId, text: nouveauCommentaire, author_id: "USER_ID" }, // Remplacer USER_ID par l'auth réelle
      { onSuccess: () => setNouveauCommentaire("") }
    );
  };

  // ✏️ Passer en mode édition
  const handleEdit = (commentaire: Commentaire) => {
    setModeEdition({ id: commentaire.id, text: commentaire.text });
  };

  // ✅ Modifier un commentaire
  const handleUpdate = () => {
    if (!modeEdition.text.trim() || modeEdition.id === null) return;

    updateCommentaire.mutate(
      { id: modeEdition.id, text: modeEdition.text },
      { onSuccess: () => setModeEdition({ id: null, text: "" }) }
    );
  };

  // ❌ Supprimer un commentaire
  const handleDelete = (id: number) => {
    if (confirm("Voulez-vous supprimer ce commentaire ?")) {
      deleteCommentaire.mutate(id);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-3">💬 Commentaires</h3>

      {isLoading ? (
        <p>Chargement des commentaires...</p>
      ) : commentaires.length === 0 ? ( // ✅ Vérification correcte
        <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
      ) : (
        <>
          {/* 🔥 Dernier commentaire */}
          <div className="p-3 bg-white rounded shadow-sm">
            <p className="text-sm text-gray-800">🗨️ {commentaires[0].text}</p>
            <p className="text-xs text-gray-500">Posté par {commentaires[0].author_id}</p>
            <div className="flex space-x-2 mt-2">
              <button
                className="text-yellow-500 hover:text-yellow-600"
                onClick={() => handleEdit(commentaires[0])}
              >
                ✏️ Modifier
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDelete(commentaires[0].id)}
              >
                🗑 Supprimer
              </button>
            </div>
          </div>
        </>
      )}

      {/* 📝 Formulaire pour ajouter un commentaire */}
      <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Ajouter un commentaire..."
          value={nouveauCommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          ➕
        </button>
      </form>

      {/* ✏️ Mode édition d'un commentaire */}
      {modeEdition.id && (
        <div className="mt-3 flex space-x-2">
          <input
            type="text"
            value={modeEdition.text}
            onChange={(e) => setModeEdition({ ...modeEdition, text: e.target.value })}
            className="flex-grow p-2 border rounded"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            ✅ Modifier
          </button>
          <button onClick={() => setModeEdition({ id: null, text: "" })} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
            ❌ Annuler
          </button>
        </div>
      )}

      {/* 🔽 Bouton pour afficher l'historique */}
      <button
        onClick={() => setAfficherHistorique(!afficherHistorique)}
        className="mt-4 w-full text-center text-blue-500 hover:underline"
      >
        {afficherHistorique ? "🔼 Masquer l'historique" : "🔽 Voir tout"}
      </button>

      {/* 🕰️ Historique complet */}
      {afficherHistorique && commentaires.length > 0 && (
        <div className="mt-3 bg-white p-3 rounded shadow">
          <h4 className="text-sm font-semibold mb-2">📜 Historique des Commentaires</h4>
          <ul className="space-y-2">
            {commentaires.map((commentaire) => (
              <li key={commentaire.id} className="p-2 border rounded">
                <p className="text-sm">🗨 {commentaire.text}</p>
                <p className="text-xs text-gray-500">Posté par {commentaire.author_id}</p>
                <div className="flex space-x-2 mt-1">
                  <button onClick={() => handleEdit(commentaire)} className="text-yellow-500 hover:text-yellow-600">
                    ✏️ Modifier
                  </button>
                  <button onClick={() => handleDelete(commentaire.id)} className="text-red-500 hover:text-red-600">
                    🗑 Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
