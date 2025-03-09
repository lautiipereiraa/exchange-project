import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed md:relative bg-gray-900 text-white h-screen w-64 p-6 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/" className="block p-2 rounded hover:bg-gray-700">
            Inicio
          </Link>
          <Link to="/configuracion" className="block p-2 rounded hover:bg-gray-700">
            Configuración
          </Link>
          <Link to="/perfil" className="block p-2 rounded hover:bg-gray-700">
            Perfil
          </Link>
          <Link to="/logout" className="block p-2 rounded hover:bg-red-700">
            Cerrar sesión
          </Link>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
