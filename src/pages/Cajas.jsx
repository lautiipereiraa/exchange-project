import React, { useEffect, useState } from 'react';
import { fetchCajas } from '../services/api';
import { toast } from 'react-toastify';

const CajasPage = () => {
  const [cajas, setCajas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCajas = async () => {
      const loadingToast = toast.loading("Cargando cajas...");

      try {
        const response = await fetchCajas();
        setCajas(response);

        toast.update(loadingToast, {
          render: "Datos cargados exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        setError('Error al obtener los datos de la API.');

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

    getCajas();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Cajas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Rol</th>
              <th className="px-4 py-2 border">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {cajas.map((caja) => (
              <tr key={caja.id} className="border-t">
                <td className="px-4 py-2 border text-center">{caja.id}</td>
                <td className="px-4 py-2 border text-center">{caja.name}</td>
                <td className="px-4 py-2 border text-center">{caja.user.name} ({caja.user.email})</td>
                <td className="px-4 py-2 border text-center">{caja.user.rol.name} ({caja.user.rol.acronym})</td>
                <td className="px-4 py-2 border text-center">{new Date(caja.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CajasPage;