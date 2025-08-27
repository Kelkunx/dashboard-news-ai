import { Card, CardContent, Typography, Link, Box } from "@mui/material";

export default function ArticleCard({ article, summary }) {
  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Card className="border rounded shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent>
        {/* Titre cliquable */}
        <Link
          href={article.link}
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            className="font-bold hover:underline"
          >
            {article.title}
          </Typography>
        </Link>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" className="mb-2">
          {truncate(article.description)}
        </Typography>

        {/* Résumé IA */}
        <Box className="p-2 rounded bg-gray-50 border-l-4 border-blue-400 mb-2">
          <Typography
            variant="body2"
            color="textPrimary"
            className="font-medium"
          >
            <strong>Résumé IA :</strong> {summary || "Chargement..."}
          </Typography>
        </Box>

        {/* Lien secondaire */}
        {article.link && (
          <Link
            href={article.link}
            target="_blank"
            rel="noopener"
            className="text-blue-500 font-medium hover:underline"
          >
            Lire l'article
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
