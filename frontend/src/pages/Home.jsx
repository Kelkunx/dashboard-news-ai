import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function Home() {
  return (
    <Box className="p-4">
      <Typography
        variant="h3"
        component="h1"
        className="font-bold mb-6 text-center"
      >
        Bienvenue sur My News App
      </Typography>

      <Box className="space-y-4">
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Suivez l'actualité facilement
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Retrouvez les dernières actualités technologiques, business,
              sports et santé, avec des résumés générés par l'IA pour une
              lecture rapide et efficace.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Fonctionnalités principales
            </Typography>
            <ul className="list-disc list-inside text-gray-700">
              <li>Filtrage par catégorie et mots-clés</li>
              <li>Résumés IA pour une lecture rapide</li>
              <li>Interface moderne et responsive</li>
            </ul>
          </CardContent>
        </Card>

        <Box className="flex justify-center mt-4">
          <Button
            component={Link}
            variant="contained"
            color="primary"
            href="/news"
          >
            Voir les news
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
