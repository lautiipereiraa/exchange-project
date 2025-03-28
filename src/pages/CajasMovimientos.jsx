import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCajas } from "../services/api";

const CajasMovimientos = () => {
    const [cajasMovimientos, setCajasMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCajasMovimientos = async () => {
            try {
                const data = await fetchCajas();
                setCajasMovimientos(data);
                setLoading(false);
            } catch (error) {
                toast.error("Error al cargar los movimientos de cajas: " + error.message, {
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };

        getCajasMovimientos();
    }, []);

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando movimientos...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Movimientos de Cajas</h1>
            <ToastContainer />
            
            <div className="mt-6">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Fecha</th>
                            <th className="px-4 py-2 border">Divisas</th>
                            <th className="px-4 py-2 border">Estado</th>
                            <th className="px-4 py-2 border">Cantidad</th>
                            <th className="px-4 py-2 border">Caja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cajasMovimientos.length > 0 ? (
                            cajasMovimientos.map((movimiento, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 border">{new Date(movimiento.date).toLocaleString()}</td>
                                    <td className="px-4 py-2 border">{movimiento.currency_id.name} ({movimiento.currency_id.symbol})</td>
                                    <td className="px-4 py-2 border">{movimiento.status}</td>
                                    <td className="px-4 py-2 border">{movimiento.mount}</td>
                                    <td className="px-4 py-2 border">{movimiento.point_of_sell.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No hay movimientos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CajasMovimientos;
