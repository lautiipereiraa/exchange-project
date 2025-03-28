import { useState, useEffect } from "react";
import { fetchTransaccionPendientes } from "../services/api";
import { Check, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransaccionesVerPendientes = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarTransacciones = async () => {
            const loadingToast = toast.loading("Cargando transacciones...");
            try {
                const data = await fetchTransaccionPendientes();
                setTransacciones(data);
                toast.update(loadingToast, {
                    render: "Transacciones cargadas exitosamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(loadingToast, {
                    render: "Error al cargar transacciones",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            } finally {
                setCargando(false);
            }
        };

        cargarTransacciones();
    }, []);

    return (
        <div className="overflow-x-auto mb-6 w-full" style={{ height: "400px" }}>
            <h1 class="text-2xl font-bold mb-6">Pendientes</h1>
            <ToastContainer />
            {!cargando && (
                <table className="min-w-full bg-white border border-gray-300 shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Fecha</th>
                            <th className="px-4 py-2 border">Transacción</th>
                            <th className="px-4 py-2 border">Divisas</th>
                            <th className="px-4 py-2 border">Cantidad</th>
                            <th className="px-4 py-2 border">Precio</th>
                            <th className="px-4 py-2 border">Monto</th>
                            <th className="px-4 py-2 border">Cliente</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {transacciones.length > 0 ? (
                            transacciones.map((transaccion) => (
                                <tr key={transaccion.id} className="border-t">
                                    <td className="px-4 py-2 border">
                                        {new Date(transaccion.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {transaccion.type_transaction.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {transaccion.pair.currencyOrigin.symbol} /{" "}
                                        {transaccion.pair.currencyDestiny.symbol}
                                    </td>
                                    <td className="px-4 py-2 border">{transaccion.quantity}</td>
                                    <td className="px-4 py-2 border">{transaccion.price}</td>
                                    <td className="px-4 py-2 border">{transaccion.mount}</td>
                                    <td className="px-4 py-2 border">{transaccion.customer.name}</td>
                                    <td className="px-4 py-2 border flex justify-center space-x-2">
                                        <button className="text-green-500 hover:text-green-700">
                                            <Check size={20} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 border text-gray-500">
                                    No hay transacciones pendientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransaccionesVerPendientes;
