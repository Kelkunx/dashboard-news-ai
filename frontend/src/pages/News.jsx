import { useState, useEffect, useCallback } from "react";
import { CircularProgress, Box, Button } from "@mui/material";
import NewsFilter from "../components/NewsFilter";
import ArticleCard from "../components/ArticleCard";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [filters, setFilters] = useState({ category: "technology", q: "" });
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState({});

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, page: 1, perPage: 50 });
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
    <Box className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dernières news</h1>

      <NewsFilter
        filters={filters}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {loading ? (
        <Box className="flex justify-center py-10">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box className="space-y-4">
            {articles.slice(0, visibleCount).map((article, idx) => (
              <ArticleCard
                key={idx}
                article={article}
                summary={summaries[article.url || article.title]}
              />
            ))}
          </Box>

          {visibleCount < articles.length && (
            <Box className="flex justify-center mt-6">
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                Show More
              </Button>
            </Box>
          )}

          {!loading && articles.length === 0 && (
            <Box className="text-center py-10 text-gray-500">
              Aucun article trouvé.
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
