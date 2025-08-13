import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="bg-gray-900 text-white p-4">
        <nav className="flex gap-4">
          <Link to="/">Accueil</Link>
          <Link to="/about">À propos</Link>
          <Link to="/news">Actualités</Link>
        </nav>
      </header>

      {/* CONTENU CENTRAL */}
      <main className="flex-grow p-4">
        <Outlet /> {/* Ici s’affichent les pages */}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-200 text-center p-4">
        <p>© {new Date().getFullYear()} Dashboard News AI</p>
      </footer>
    </div>
  );
}
