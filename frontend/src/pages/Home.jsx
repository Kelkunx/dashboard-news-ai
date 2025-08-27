// frontend/src/pages/Home.jsx
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-8 text-center">
      <Typography variant="h3" className="font-bold">
        Bienvenue sur <span className="text-blue-600">My News App</span>
      </Typography>
      <Typography variant="h6" className="text-gray-600 max-w-2xl mx-auto">
        Une plateforme moderne pour explorer, filtrer et résumer l'actualité en
        temps réel grâce à l'IA.
      </Typography>

      <Card className="max-w-2xl mx-auto shadow-md rounded-2xl">
        <CardContent className="space-y-4">
          <Typography variant="h5" className="font-semibold">
            Découvre les dernières actualités
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Parcours les articles, utilise la recherche avancée et profite de
            résumés générés automatiquement.
          </Typography>
          <Button
            component={Link}
            to="/news"
            variant="contained"
            size="large"
            className="capitalize"
          >
            Voir les actualités
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
