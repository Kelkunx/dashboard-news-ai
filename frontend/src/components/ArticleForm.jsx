import { useState } from "react";

export default function ArticleForm({ onArticleAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !content) {
      setError("Titre et contenu sont obligatoires");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.message || "Erreur lors de la création de l'article"
        );
      }

      const newArticle = await res.json();
      onArticleAdded(newArticle);
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="font-bold mb-2">Ajouter un article</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border my-2 rounded"
      />
      <textarea
        placeholder="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border my-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter
      </button>
    </form>
  );
}
