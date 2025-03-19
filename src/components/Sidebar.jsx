import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Home, Wallet, FileText, DollarSign, Settings } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex">
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        style={{ backgroundColor: "#1a1c46" }}
        className={`fixed md:relative text-white h-full md:h-screen w-64 p-6 transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          z-50`}
      >
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="space-y-4 overflow-y-scroll h-full max-h-[calc(100vh-48px)] scrollbar-hide">
          <Link to="/dashboard" className="flex items-center p-2 rounded hover:bg-gray-700">
            <Home size={20} className="mr-3" /> 
            <span>Dashboard</span>
          </Link>

          <div>
            <button
              onClick={() => toggleSection("caja")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center">
                <Wallet size={20} className="mr-3" /> {/* Icono de caja */}
                <span>Caja</span>
              </div>
              {openSections.caja ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.caja && (
              <div className="ml-4 border-l border-gray-600 pl-3 space-y-2">
                <Link to="/caja/inicio" className="block p-2 rounded hover:bg-gray-700">Inicio</Link>
                <Link to="/caja/movimientos" className="block p-2 rounded hover:bg-gray-700">Movimientos</Link>
                <Link to="/caja/estado" className="block p-2 rounded hover:bg-gray-700">Estado</Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection("cotizaciones")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center">
                <FileText size={20} className="mr-3" /> {/* Icono de cotizaciones */}
                <span>Cotizaciones</span>
              </div>
              {openSections.cotizaciones ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.cotizaciones && (
              <div className="ml-4 border-l border-gray-600 pl-3 space-y-2">
                <Link to="/cotizaciones/mostrar" className="block p-2 rounded hover:bg-gray-700">Mostrar</Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection("transacciones")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center">
                <DollarSign size={20} className="mr-3" /> 
                <span>Transacciones</span>
              </div>
              {openSections.transacciones ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.transacciones && (
              <div className="ml-4 border-l border-gray-600 pl-3 space-y-2">
                <Link to="/transacciones/historial" className="block p-2 rounded hover:bg-gray-700">Historial</Link>
                <Link to="/transacciones/nueva" className="block p-2 rounded hover:bg-gray-700">Nueva</Link>
                <Link to="/transacciones/pendientes" className="block p-2 rounded hover:bg-gray-700">Pendientes</Link>
                <Link to="/transacciones/ver-pendientes" className="block p-2 rounded hover:bg-gray-700">Ver pendientes</Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection("configuracion")}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 focus:outline-none"
            >
              <div className="flex items-center">
                <Settings size={20} className="mr-3" /> 
                <span>Configuración</span>
              </div>
              {openSections.configuracion ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openSections.configuracion && (
              <div className="ml-4 border-l border-gray-600 pl-3 space-y-2">
                <Link to="/configuracion/clientes" className="block p-2 rounded hover:bg-gray-700">Clientes</Link>
                <Link to="/configuracion/usuarios" className="block p-2 rounded hover:bg-gray-700">Usuarios</Link>
                <Link to="/configuracion/roles" className="block p-2 rounded hover:bg-gray-700">Roles</Link>
                <Link to="/configuracion/permisos" className="block p-2 rounded hover:bg-gray-700">Permisos</Link>
                <Link to="/configuracion/divisas" className="block p-2 rounded hover:bg-gray-700">Divisas</Link>
                <Link to="/configuracion/punto-cambio" className="block p-2 rounded hover:bg-gray-700">Punto de Cambio</Link>
                <Link to="/configuracion/par" className="block p-2 rounded hover:bg-gray-700">Par</Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
