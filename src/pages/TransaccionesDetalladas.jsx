import React, { useEffect, useState } from "react";
import { fetchTransaccionDetalladas } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransaccionDetalladaPage = () => {
  const [tiposDeCambio, setTiposDeCambio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransaccionDetallada = async () => {
      const loadingToast = toast.loading("Cargando transacciones detalladas...");

      try {
        const data = await fetchTransaccionDetalladas();
        setTiposDeCambio(data);

        toast.update(loadingToast, {
          render: "Datos cargados correctamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        setError(err.message);

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

    getTransaccionDetallada();
  }, []);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transacciones Detalladas</h2>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Moneda</th>
              <th className="p-3 border">Compra</th>
              <th className="p-3 border">Venta</th>
            </tr>
          </thead>
          <tbody>
            {tiposDeCambio.map((tipo, index) => (
              <tr key={index} className="text-center bg-gray-100 border-b hover:bg-gray-200">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{tipo.name}</td>
                <td className="p-2 border">{tipo.buy}</td>
                <td className="p-2 border">{tipo.sell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransaccionDetalladaPage;
