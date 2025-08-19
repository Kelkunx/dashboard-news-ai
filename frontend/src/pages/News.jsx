import { useState, useEffect, useCallback } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // nombre initial d'articles visibles
  const [filters, setFilters] = useState({ category: "technology", q: "" });
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState({});

  // Fonction pour tronquer la description
  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, page: 1, perPage: 50 }); // fetch d'avance
      const res = await fetch(`http://localhost:3000/news?${params}`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Erreur récupération news", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Génération résumés IA uniquement pour les articles visibles
  useEffect(() => {
    articles.slice(0, visibleCount).forEach((article) => {
      const key = article.url || article.title;
      if (!summaries[key]) {
        const text = article.content || article.description || "";
        if (text) {
          fetch("http://localhost:3000/summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          })
            .then((res) => res.json())
            .then((data) => {
              setSummaries((prev) => ({ ...prev, [key]: data.summary }));
            })
            .catch(() => {
              setSummaries((prev) => ({
                ...prev,
                [key]: "Résumé indisponible",
              }));
            });
        }
      }
    });
  }, [articles, visibleCount, summaries]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisibleCount(5);
    fetchNews();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dernières news</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 flex-wrap">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="technology">Technologie</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="health">Santé</option>
        </select>

        <input
          type="text"
          name="q"
          placeholder="Rechercher un mot-clé..."
          value={filters.q}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filtrer
        </button>
      </form>

      {/* Liste */}
      {loading ? (
        <div className="py-10 text-center">Chargement...</div>
      ) : (
        <div className="space-y-4">
          {articles.slice(0, visibleCount).map((article, index) => {
            const key = article.url || article.title;
            return (
              <div key={index} className="p-4 border rounded">
                <h2 className="font-semibold">{article.title}</h2>
                <p>{truncate(article.description)}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Résumé IA :</strong>{" "}
                  {summaries[key] || "Chargement..."}
                </p>
                {article.link && (
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Lire l'article
                  </a>
                )}
              </div>
            );
          })}
          {visibleCount < articles.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
