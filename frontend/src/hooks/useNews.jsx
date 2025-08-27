import { useState, useEffect, useCallback } from "react";

export default function useNews(
  initialFilters = { category: "technology", q: "" }
) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

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

  return { articles, loading, filters, setFilters, fetchNews };
}
