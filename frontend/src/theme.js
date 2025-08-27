import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6", // bleu Tailwind
    },
    secondary: {
      main: "#7c3aed", // violet Tailwind
    },
    background: {
      default: "#f9fafb",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h6: { fontWeight: 600 },
    body2: { fontSize: 14, lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 16, // arrondis doux partout
  },
});

export default theme;
