import { Box, Typography, Card, CardContent, Link } from "@mui/material";

export default function About() {
  return (
    <Box className="p-4">
      <Typography
        variant="h3"
        component="h1"
        className="font-bold mb-6 text-center"
      >
        À propos
      </Typography>

      <Box className="space-y-4">
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Objectif de l’application
            </Typography>
            <Typography variant="body1" color="textSecondary">
              My News App a été créée pour centraliser l'information et
              permettre aux utilisateurs de suivre les actualités rapidement
              grâce à des résumés générés par l'IA.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Technologies utilisées
            </Typography>
            <ul className="list-disc list-inside text-gray-700">
              <li>Frontend : React, Material UI, Tailwind CSS</li>
              <li>Backend : NestJS</li>
              <li>Flux RSS pour les articles</li>
              <li>Résumé IA via HuggingFace API</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Pour toute question ou suggestion, contactez-nous sur{" "}
              <Link href="mailto:support@mynewsapp.com">
                support@mynewsapp.com
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
