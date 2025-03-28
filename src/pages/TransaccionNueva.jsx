import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchClientes, fetchDivisas, fetchTipoTransaccion } from "../services/api";

const TransaccionNueva = () => {
    const [clientes, setClientes] = useState([]);
    const [divisas, setDivisas] = useState([]);
    const [tiposTransaccion, setTiposTransaccion] = useState([]); 
    const [tipoTransaccion, setTipoTransaccion] = useState("");
    const [par, setPar] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesData, divisasData, tiposTransaccionData] = await Promise.all([
                    fetchClientes(),
                    fetchDivisas(),
                    fetchTipoTransaccion(), 
                ]);

                setClientes(clientesData);
                setDivisas(divisasData);
                setTiposTransaccion(tiposTransaccionData); 

             
                if (clientesData.length > 0) setTipoTransaccion(tiposTransaccionData[0]?.name || ""); 
                if (divisasData.length > 0) setPar(divisasData[0]?.nombre || "");

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
            cliente: clientes[0]?.name || "",
            fecha: new Date().toLocaleDateString(),
        };

        setTransactions([...transactions, newTransaction]);
        toast.success("Transacción creada exitosamente", {
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
                    Transacciones
                </h3>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Cliente</label>
                            <select
                                value={tipoTransaccion}
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
                                {tiposTransaccion.map((tipo) => (
                                    <option key={tipo.id} value={tipo.name}>
                                        {tipo.name}
                                    </option>
                                ))}
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

            <div className="overflow-x-auto mb-6 w-full">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border text-white bg-gray-900">Tipo de Transacción</th>
                            <th className="px-4 py-2 border text-white bg-gray-900">Par</th>
                            <th className="px-4 py-2 border text-white bg-gray-900">Cantidad</th>
                            <th className="px-4 py-2 border text-white bg-gray-900">Cliente</th>
                            <th className="px-4 py-2 border text-white bg-gray-900">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 border">{transaction.tipoTransaccion}</td>
                                <td className="px-4 py-2 border">{transaction.par}</td>
                                <td className="px-4 py-2 border">{transaction.cantidad}</td>
                                <td className="px-4 py-2 border">{transaction.cliente}</td>
                                <td className="px-4 py-2 border">{transaction.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransaccionNueva;
