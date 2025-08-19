import { useCallback, useEffect, useState } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);

  // État "live" du formulaire
  const [formFilters, setFormFilters] = useState({
    category: "technology",
    country: "fr",
    language: "fr",
    q: "",
  });

  // État validé qui déclenche la requête
  const [filters, setFilters] = useState(formFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Résumés IA pour chaque article
  const [summaries, setSummaries] = useState({}); // clé = article.url ou title

  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les news
  const fetchNews = useCallback(async () => {
    setLoading(true); // début du chargement
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await fetch(`http://localhost:3000/news?${query}`);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error("Erreur récupération news", err);
    } finally {
      setLoading(false); // fin du chargement
    }
  }, [filters]);

  // Quand filters change, on recharge les news
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Fonction pour récupérer le résumé IA d'un article
  const fetchSummary = async (text, key) => {
    try {
      const res = await fetch("http://localhost:3000/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSummaries((prev) => ({ ...prev, [key]: data.summary }));
    } catch (err) {
      console.error("Erreur résumé IA", err);
      setSummaries((prev) => ({ ...prev, [key]: "Résumé indisponible" }));
    }
  };

  // Récupération des résumés quand les articles changent
  useEffect(() => {
    articles.forEach((article) => {
      const key = article.url || article.title;
      if (!summaries[key]) {
        const text = `${article.title || ""}. ${article.description || ""}. ${article.content || ""}`;

        if (text) fetchSummary(text, key);
      }
    });
  }, [articles]);

  const handleChange = (e) => {
    setFormFilters({ ...formFilters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilters(formFilters); // applique les filtres validés
  };

  // Pagination
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dernières news</h1>

      {/* Formulaire de filtres */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 flex-wrap">
        <select
          name="category"
          value={formFilters.category}
          onChange={handleChange}
        >
          <option value="technology">Technologie</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="health">Santé</option>
        </select>

        <select
          name="country"
          value={formFilters.country}
          onChange={handleChange}
        >
          <option value="fr">France</option>
          <option value="us">USA</option>
          <option value="gb">Royaume-Uni</option>
          <option value="ca">Canada</option>
        </select>

        <select
          name="language"
          value={formFilters.language}
          onChange={handleChange}
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>

        <input
          type="text"
          name="q"
          placeholder="Rechercher un mot-clé..."
          value={formFilters.q}
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

      {/* Liste des articles */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          currentArticles.map((article, index) => {
            const key = article.url || article.title;
            return (
              <div key={index} className="p-4 border rounded">
                <h2 className="font-semibold">{article.title}</h2>
                <p>{article.description}</p>
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
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Précédent
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
