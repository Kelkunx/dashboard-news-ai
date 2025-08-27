import { Card, CardContent, Typography, Link } from "@mui/material";

export default function ArticleCard({ article, summary }) {
  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Card className="border rounded">
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {truncate(article.description)}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          className="mt-2 block"
        >
          <strong>Résumé IA :</strong> {summary || "Chargement..."}
        </Typography>
        {article.link && (
          <Link
            href={article.link}
            target="_blank"
            rel="noopener"
            className="block mt-2 text-blue-500"
          >
            Lire l'article
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
