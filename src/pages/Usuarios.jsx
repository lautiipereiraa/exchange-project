import { useEffect, useState } from "react";
import { fetchUsuarios } from "../services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

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
        toast.update(loadingToast, {
          render: "Error al cargar usuarios",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };
    cargarUsuarios();
  }, []);

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
          {usuarios.map((usuario) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;