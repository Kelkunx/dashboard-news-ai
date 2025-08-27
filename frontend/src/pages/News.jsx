import { useState, useEffect, useCallback } from "react";
import NewsFilter from "../components/NewsFilter";
import ArticleList from "../components/ArticlesList";

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setVisibleCount(5);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dernières news</h1>
      <NewsFilter filters={filters} onFilterChange={handleFilterChange} />
      <ArticleList
        articles={articles}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        summaries={summaries}
        setSummaries={setSummaries}
        loading={loading}
      />
    </div>
  );
}
