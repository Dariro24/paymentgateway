import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-md mx-auto px-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            <Link to="/">Mi Tienda</Link>
          </h1>
          <nav>
            <Link to="/" className="text-sm hover:underline">Inicio</Link>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow px-4 py-6 max-w-md mx-auto w-full">
        {children}
      </main>

      {/* Footer opcional */}
      <footer className="bg-white text-center text-xs text-gray-500 py-2 border-t">
        &copy; {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Layout;
