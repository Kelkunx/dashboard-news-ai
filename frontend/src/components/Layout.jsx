// frontend/src/components/Layout.jsx
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="font-bold">Dashboard News AI</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/news" className="hover:underline">
              News
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4">
        <Outlet /> {/* Affiche le contenu de la page actuelle */}
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-4">
        &copy; 2025 Dashboard News AI
      </footer>
    </div>
  );
}
