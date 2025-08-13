import { useState } from "react";

export default function EditArticleForm({ article, onSave, onCancel }) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(article.id, title, content);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded shadow bg-gray-50"
    >
      <h3 className="font-bold mb-2">Modifier l'article</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border my-2 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border my-2 rounded"
      />
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
