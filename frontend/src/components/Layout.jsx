// frontend/src/components/Layout.jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "News", path: "/news" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={1}
        className="bg-white text-gray-900"
      >
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            className="font-bold tracking-wide text-primary"
          >
            My News App
          </Typography>

          <div className="space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant={isActive(item.path) ? "contained" : "outlined"}
                color={isActive(item.path) ? "primary" : "inherit"}
                className="capitalize"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="lg" className="flex-1 py-8">
        <Outlet />
      </Container>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-8">
        <Typography variant="body2">
          © {new Date().getFullYear()} My News App — All rights reserved
        </Typography>
      </footer>
    </div>
  );
}
