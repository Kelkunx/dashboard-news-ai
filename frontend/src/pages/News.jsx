import { useEffect, useState } from "react";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    category: "technology",
    country: "fr",
    language: "fr",
  });

  const fetchNews = () => {
    const query = new URLSearchParams(filters).toString();
    fetch(`http://localhost:3000/news?${query}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Erreur récupération news", err));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dernières news</h1>

      {/* Formulaire de filtres */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
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

        <select name="country" value={filters.country} onChange={handleChange}>
          <option value="fr">France</option>
          <option value="us">USA</option>
          <option value="gb">Royaume-Uni</option>
          <option value="ca">Canada</option>
        </select>

        <select
          name="language"
          value={filters.language}
          onChange={handleChange}
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filtrer
        </button>
      </form>

      {/* Liste des articles */}
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="p-4 border rounded">
            <h2 className="font-semibold">{article.title}</h2>
            <p>{article.description}</p>
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
        ))}
      </div>
    </div>
  );
}
