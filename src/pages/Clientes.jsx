import React, { useEffect, useState } from 'react';
import { fetchClientes } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientesContent = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClientes = async () => {
      const loadingToast = toast.loading("Cargando clientes...");

      try {
        const clientesData = await fetchClientes();
        setClientes(clientesData);

        toast.update(loadingToast, {
          render: "Datos cargados exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        setError("Error al obtener los datos de la API.");

        toast.update(loadingToast, {
          render: "Error al cargar los datos",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    getClientes();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      <ToastContainer /> 
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t">
                <td className="px-4 py-2 border text-center">{cliente.id}</td>
                <td className="px-4 py-2 border text-center">{cliente.name}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(cliente.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesContent;
