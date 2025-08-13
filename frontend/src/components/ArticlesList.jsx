export default function ArticlesList({
  articles,
  onArticleDeleted,
  onArticleEdit,
}) {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/articles/${id}`, { method: "DELETE" });
    onArticleDeleted(id);
  };

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="border p-4 my-2 rounded shadow">
          <h3 className="font-bold">{article.title}</h3>
          <p>{article.content}</p>
          <small>{new Date(article.date).toLocaleString()}</small>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => onArticleEdit(article)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDelete(article.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
