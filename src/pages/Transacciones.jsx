import React, { useEffect, useState } from "react";
import { fetchTransaccion } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransaccionPage = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransacciones = async () => {
      const loadingToast = toast.loading("Cargando transacciones...");
      
      try {
        const data = await fetchTransaccion();
        setTransacciones(data);

        toast.update(loadingToast, {
          render: "Datos cargados exitosamente",
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

    getTransacciones();
  }, []);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transacciones</h2>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Tipo</th>
              <th className="p-3 border">Par</th>
              <th className="p-3 border">Cantidad</th>
              <th className="p-3 border">Precio</th>
              <th className="p-3 border">Monto</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border">Punto de Venta</th>
              <th className="p-3 border">Cajero</th>
              <th className="p-3 border">Cliente</th>
              <th className="p-3 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((trx) => (
              <tr key={trx.id} className="text-center bg-gray-100 border-b hover:bg-gray-200">
                <td className="p-2 border">{trx.id}</td>
                <td className="p-2 border">{trx.type_transaction.name}</td>
                <td className="p-2 border">{trx.pair.name}</td>
                <td className="p-2 border">{trx.quantity}</td>
                <td className="p-2 border">{trx.price}</td>
                <td className="p-2 border">{trx.mount}</td>
                <td className="p-2 border">{trx.status}</td>
                <td className="p-2 border">{trx.point_of_sell.name}</td>
                <td className="p-2 border">{trx.point_of_sell.user.name}</td>
                <td className="p-2 border">{trx.customer.name}</td>
                <td className="p-2 border">{new Date(trx.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransaccionPage;
