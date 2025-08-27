import ArticleCard from "./ArticleCard";
import { Button, Box } from "@mui/material";
import Loader from "./Loader";

export default function ArticleList({
  articles,
  visibleCount,
  setVisibleCount,
  summaries,
  loading,
}) {
  if (loading) return <Loader />;

  return (
    <Box>
      {articles.slice(0, visibleCount).map((article, index) => {
        const key = article.url || article.title;
        return (
          <ArticleCard key={index} article={article} summary={summaries[key]} />
        );
      })}
      {visibleCount < articles.length && (
        <Box textAlign="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}
