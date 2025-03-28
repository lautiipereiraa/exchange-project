import { useEffect, useState } from "react";
import { fetchUsuarios } from "../services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 15;

  useEffect(() => {
    const cargarUsuarios = async () => {
      const loadingToast = toast.loading("Cargando usuarios...");
      try {
        const data = await fetchUsuarios();
        setUsuarios(data);
        toast.update(loadingToast, {
          render: "Usuarios cargados exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        setError("Error al cargar usuarios.");
        toast.update(loadingToast, {
          render: "Error al cargar usuarios",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    cargarUsuarios();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  return (
    <div className="overflow-x-auto mb-6 w-full">
      <ToastContainer />
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Rol</th>
            <th className="px-4 py-2 border">Fecha Creación</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {usuariosPaginados.length > 0 ? (
            usuariosPaginados.map((usuario) => (
              <tr key={usuario.id} className="border-t">
                <td className="px-4 py-2 border">{usuario.id}</td>
                <td className="px-4 py-2 border">{usuario.name}</td>
                <td className="px-4 py-2 border">{usuario.email}</td>
                <td className="px-4 py-2 border">{usuario.rol.name} ({usuario.rol.acronym})</td>
                <td className="px-4 py-2 border">{new Date(usuario.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border flex justify-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 border text-gray-500">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página <strong>{paginaActual}</strong> de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Usuarios;
