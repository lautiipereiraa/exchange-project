import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPar } from "../services/api"; 

const Cotizaciones = () => {
    const [paresDivisas, setParesDivisas] = useState([]); 
    const [parSeleccionado, setParSeleccionado] = useState(""); 
    const [precioCompra, setPrecioCompra] = useState(""); 
    const [precioVenta, setPrecioVenta] = useState(""); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getParesDivisas = async () => {
            try {
                const data = await fetchPar(); 
                setParesDivisas(data); 
                setLoading(false);
            } catch (error) {
                toast.error("Error al cargar los pares de divisas: " + error.message, {
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };

        getParesDivisas(); 
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!parSeleccionado || !precioCompra || !precioVenta) {
            toast.error("Por favor complete todos los campos", {
                autoClose: 3000,
            });
            return;
        }

        const cotizacion = {
            par: parSeleccionado,
            compra: precioCompra,
            venta: precioVenta,
        };

        toast.success("Cotización guardada exitosamente", {
            autoClose: 3000,
        });

    };

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando pares de divisas...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Cotización de Divisas</h1>
            <ToastContainer />

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Par de Divisas</label>
                        <select
                            value={parSeleccionado}
                            onChange={(e) => setParSeleccionado(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Seleccione un par</option>
                            {paresDivisas.map((par) => (
                                <option key={par.id} value={par.name}>
                                    {`${par.currencyOrigin.name} (${par.currencyOrigin.symbol}) / ${par.currencyDestiny.name} (${par.currencyDestiny.symbol})`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Precio de Compra</label>
                        <input
                            type="number"
                            step="0.01"
                            value={precioCompra}
                            onChange={(e) => setPrecioCompra(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Precio de Compra"
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Precio de Venta</label>
                        <input
                            type="number"
                            step="0.01"
                            value={precioVenta}
                            onChange={(e) => setPrecioVenta(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Precio de Venta"
                        />
                    </div>

                    <div className="col-span-2 flex justify-end mt-6">
                        <button
                            type="submit"
                            className="text-white bg-gray-900 py-3 px-6 rounded-md transition duration-300"
                        >
                            Guardar Cotización
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Cotizaciones;
