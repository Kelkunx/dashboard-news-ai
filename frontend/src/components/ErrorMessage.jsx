import { Alert, AlertTitle } from "@mui/material";

export default function ErrorMessage({ type }) {
  if (type === "no-results") {
    return (
      <Alert severity="info" className="rounded-2xl shadow-md">
        <AlertTitle>Aucun résultat</AlertTitle>
        Aucun article ne correspond à votre recherche.
      </Alert>
    );
  }

  return (
    <Alert severity="error" className="rounded-2xl shadow-md">
      <AlertTitle>Erreur</AlertTitle>
      Impossible de récupérer les articles. Veuillez réessayer plus tard.
    </Alert>
  );
}
