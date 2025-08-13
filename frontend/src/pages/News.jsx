import ArticlesList from "../components/ArticlesList";
import ArticleForm from "../components/ArticleForm";
import EditArticleForm from "../components/EditArticleForm";
import { useState, useEffect } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const handleArticleUpdated = (updatedArticle) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
    setEditingArticle(null); // fermer le formulaire
  };

  return (
    <div>
      {editingArticle ? (
        <EditArticleForm
          article={editingArticle}
          onSave={handleArticleUpdated}
          onCancel={() => setEditingArticle(null)}
        />
      ) : (
        <ArticleForm
          onArticleAdded={(article) =>
            setArticles((prev) => [...prev, article])
          }
        />
      )}

      <ArticlesList
        articles={articles}
        onArticleDeleted={(id) =>
          setArticles((prev) => prev.filter((a) => a.id !== id))
        }
        onArticleEdit={setEditingArticle} // ← c’est ça qui déclenche le formulaire
      />
    </div>
  );
}
