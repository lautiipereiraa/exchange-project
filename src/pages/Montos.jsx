import React, { useEffect, useState } from "react";
import { fetchMontos } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MontosPage = () => {
  const [tiposDeCambio, setTiposDeCambio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTiposDeCambio = async () => {
      const loadingToast = toast.loading("Cargando montos...");

      try {
        const data = await fetchMontos();
        setTiposDeCambio(data);

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

    getTiposDeCambio();
  }, []);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Montos</h2>
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Moneda</th>
              <th className="p-3 border">Compra</th>
              <th className="p-3 border">Compra $</th>
              <th className="p-3 border">Promedio Compra</th>
              <th className="p-3 border">Venta</th>
              <th className="p-3 border">Venta $</th>
              <th className="p-3 border">Promedio Venta</th>
            </tr>
          </thead>
          <tbody>
            {tiposDeCambio.map((tipo, index) => (
              <tr
                key={index}
                className={`text-center border-b hover:bg-gray-200 ${
                  tipo.name === "Totales" ? "font-bold bg-gray-300" : "bg-gray-100"
                }`}
              >
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{tipo.name}</td>
                <td className="p-2 border">{tipo.buy}</td>
                <td className="p-2 border">{tipo["buy$"]?.toLocaleString()}</td>
                <td className="p-2 border">{tipo.averagebuy ? tipo.averagebuy.toFixed(2) : "-"}</td>
                <td className="p-2 border">{tipo.sell}</td>
                <td className="p-2 border">{tipo["sell$"]?.toLocaleString()}</td>
                <td className="p-2 border">{tipo.averagesell ? tipo.averagesell.toFixed(2) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MontosPage;
