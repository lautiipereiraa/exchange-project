import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransaccionOpen, setIsTransaccionOpen] = useState(false);

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
        <h2 className="text-xl font-bold mb-6">Exchange</h2>
        <nav className="space-y-4">
          <Link to="/" className="block p-2 rounded hover:bg-gray-700">
            Inicio
          </Link>
          <Link to="/clientes" className="block p-2 rounded hover:bg-gray-700">
            Clientes
          </Link>
          <Link to="/divisas" className="block p-2 rounded hover:bg-gray-700">
            Divisas
          </Link>
          <Link to="/par" className="block p-2 rounded hover:bg-gray-700">
            Par
          </Link>
          <Link to="/puntos-cambios" className="block p-2 rounded hover:bg-gray-700">
            Puntos Cambios
          </Link>

          <div>
            <button
              onClick={() => setIsTransaccionOpen(!isTransaccionOpen)}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <span>Transacción</span>
              {isTransaccionOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isTransaccionOpen && (
              <div className="ml-4 border-l border-gray-600 pl-3 space-y-2">
                <Link to="/transacciones" className="block p-2 rounded hover:bg-gray-700">
                  Transacción
                </Link>
                <Link to="/transacciones-detalladas" className="block p-2 rounded hover:bg-gray-700">
                  Transacciones Detalladas
                </Link>
                {/* <Link to="/transacciones-pendientes" className="block p-2 rounded hover:bg-gray-700">
                  Transacciones Pendientes
                </Link> */}
                <Link to="/montos" className="block p-2 rounded hover:bg-gray-700">
                  Montos
                </Link>
              </div>
            )}
          </div>

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
