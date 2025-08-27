import { useState } from "react";
import useNews from "../hooks/useNews";
import useSummaries from "../hooks/useSummaries";
import NewsFilter from "../components/NewsFilter";
import ArticleList from "../components/ArticleList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function News() {
  const { articles, loading, error, filters, setFilters, fetchNews } =
    useNews();
  const [visibleCount, setVisibleCount] = useState(5);
  const { summaries } = useSummaries(articles, visibleCount);

  if (error) return <ErrorMessage />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dernières news</h1>

      <NewsFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={() => {
          setVisibleCount(5);
          fetchNews();
        }}
      />

      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <ErrorMessage type="no-results" />
      ) : (
        <ArticleList
          articles={articles}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          summaries={summaries}
        />
      )}
    </div>
  );
}
