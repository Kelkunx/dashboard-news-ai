// frontend/src/pages/About.jsx
import { Typography, Card, CardContent } from "@mui/material";

export default function About() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Typography variant="h4" className="font-bold text-blue-600">
        À propos
      </Typography>

      <Card className="shadow-md rounded-2xl">
        <CardContent className="space-y-4">
          <Typography variant="body1" className="text-gray-700">
            <strong>My News App</strong> est un projet moderne qui combine
            React, NestJS et l'intelligence artificielle pour rendre l'accès à
            l'information plus simple et efficace.
          </Typography>
          <Typography variant="body1" className="text-gray-700">
            Les fonctionnalités incluent :
          </Typography>
          <ul className="list-disc pl-6 text-left text-gray-600 space-y-1">
            <li>Recherche et filtrage des articles</li>
            <li>Résumé automatique des contenus par IA</li>
            <li>Affichage fluide et responsive</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
