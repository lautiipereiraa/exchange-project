import React, { useEffect, useState } from 'react';
import { fetchPar } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ParDivisasPage = () => {
  const [paresDivisas, setParesDivisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParesDivisas = async () => {
      const loadingToast = toast.loading("Cargando pares de divisas...");

      try {
        const paresData = await fetchPar();
        setParesDivisas(paresData);

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

    getParesDivisas();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pares de Divisas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Par</th>
              <th className="px-4 py-2 border">Divisa Origen</th>
              <th className="px-4 py-2 border">Divisa Destino</th>
              <th className="px-4 py-2 border">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {paresDivisas.map((par) => (
              <tr key={par.id} className="border-t">
                <td className="px-4 py-2 border text-center">{par.id}</td>
                <td className="px-4 py-2 border text-center">{par.name}</td>
                <td className="px-4 py-2 border text-center">{par.currencyOrigin.name} ({par.currencyOrigin.symbol})</td>
                <td className="px-4 py-2 border text-center">{par.currencyDestiny.name} ({par.currencyDestiny.symbol})</td>
                <td className="px-4 py-2 border text-center">{new Date(par.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ParDivisasPage;
