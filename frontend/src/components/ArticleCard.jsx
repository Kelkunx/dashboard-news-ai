import { Card, CardContent, Typography, Link, Box, Stack } from "@mui/material";

export default function ArticleCard({ article, summary }) {
  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const formattedDate = article.pubDate
    ? new Date(article.pubDate).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Card variant="outlined" sx={{ mb: 2, position: "relative" }}>
      <CardContent>
        {/* Titre et date */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
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
          {formattedDate && (
            <Typography variant="caption" color="textSecondary">
              {formattedDate}
            </Typography>
          )}
        </Stack>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" paragraph>
          {truncate(article.description)}
        </Typography>

        {/* Résumé IA */}
        <Box sx={{ p: 1, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="body2" color="textPrimary">
            <strong>Résumé IA :</strong> {summary || "Chargement..."}
          </Typography>
        </Box>

        {/* Lien vers l'article */}
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
