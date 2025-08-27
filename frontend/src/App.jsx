// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="news" element={<News />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}
