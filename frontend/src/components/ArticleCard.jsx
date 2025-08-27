import { Card, CardContent, Typography, Link, Box } from "@mui/material";

export default function ArticleCard({ article, summary }) {
  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="a"
          href={article.link}
          target="_blank"
          rel="noopener"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "bold",
          }}
          gutterBottom
        >
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {truncate(article.description)}
        </Typography>
        <Box sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="body2" color="textPrimary">
            <strong>Résumé IA :</strong> {summary || "Chargement..."}
          </Typography>
        </Box>
        {article.link && (
          <Link
            href={article.link}
            target="_blank"
            rel="noopener"
            sx={{ mt: 1, display: "block" }}
          >
            Lire l'article
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
