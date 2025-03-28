import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchClientes, fetchDivisas, fetchTipoTransaccion } from "../services/api";

const TransaccionPendiente = () => {
    const [clientes, setClientes] = useState([]);
    const [divisas, setDivisas] = useState([]);
    const [tipoTransaccion, setTipoTransaccion] = useState("");
    const [par, setPar] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [precio, setPrecio] = useState("");
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesData, divisasData, tipoTransaccionData] = await Promise.all([
                    fetchClientes(),
                    fetchDivisas(),
                    fetchTipoTransaccion()
                ]);

                setClientes(clientesData);
                setDivisas(divisasData);
                setTipoTransaccion(tipoTransaccionData[0]?.nombre || "Compra"); 
                setPar(divisasData[0]?.nombre || "");

                setLoading(false);
            } catch (error) {
                toast.error("Error al cargar los datos: " + error.message, {
                    autoClose: 3000,
                });
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTransaction = {
            tipoTransaccion,
            par,
            cantidad,
            precio,
            cliente: clientes[0]?.name || "",
            fecha: new Date().toLocaleDateString(),
        };

        toast.success("Transacción pendiente creada exitosamente", {
            autoClose: 3000,
        });
    };

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando datos...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <ToastContainer />

            <div className="overflow-x-auto mb-6 w-full rounded-lg">
                <h3 className="text-2xl font-semibold text-white bg-gray-900 p-2">
                    Pendientes de Transacción
                </h3>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Cliente</label>
                            <select
                                value={clientes[0]?.name || ""}
                                onChange={(e) => setTipoTransaccion(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.name}>
                                        {cliente.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tipo de Transacción</label>
                            <select
                                value={tipoTransaccion}
                                onChange={(e) => setTipoTransaccion(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="Compra">Compra</option>
                                <option value="Venta">Venta</option>
                            </select>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Divisa (Par)</label>
                            <select
                                value={par}
                                onChange={(e) => setPar(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {divisas.map((divisa) => (
                                    <option key={divisa.id} value={divisa.name}>
                                        {divisa.name} ({divisa.symbol})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Precio</label>
                            <input
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="col-span-2 flex justify-end mt-6">
                            <button
                                type="submit"
                                className="text-white bg-gray-900 py-3 px-6 rounded-md transition duration-300"
                            >
                                Generar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransaccionPendiente;
