import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { Button } from "@mui/material";
import Loader from "./Loader";

export default function ArticleList({
  articles,
  visibleCount,
  setVisibleCount,
  summaries,
  setSummaries,
  loading,
}) {
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
  }, [articles, visibleCount, summaries, setSummaries]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {articles.slice(0, visibleCount).map((article, index) => {
        const key = article.url || article.title;
        return (
          <ArticleCard key={index} article={article} summary={summaries[key]} />
        );
      })}
      {visibleCount < articles.length && (
        <div className="text-center">
          <Button
            variant="outlined"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
