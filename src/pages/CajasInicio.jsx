import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDivisas, fetchUsuarios } from "../services/api";
import { Trash2 } from "lucide-react";


const CajasInicio = () => {
    const [divisas, setDivisas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [divisaSeleccionada, setDivisaSeleccionada] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [cajasAsignadas, setCajasAsignadas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [divisasData, usuariosData] = await Promise.all([
                    fetchDivisas(),
                    fetchUsuarios()
                ]);

                setDivisas(divisasData);
                setUsuarios(usuariosData);

                if (divisasData.length > 0) setDivisaSeleccionada(divisasData[0]?.nombre || "");
                if (usuariosData.length > 0) setUsuarioSeleccionado(usuariosData[0]?.name || "");

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

    const handleAgregarCaja = (e) => {
        e.preventDefault();
        if (!cantidad || cantidad <= 0) {
            toast.error("La cantidad debe ser mayor a 0", { autoClose: 3000 });
            return;
        }

        const nuevaCaja = {
            divisa: divisaSeleccionada,
            cantidad,
        };
        setCajasAsignadas([...cajasAsignadas, nuevaCaja]);
        setCantidad("");
        toast.success("Caja agregada exitosamente", {
            autoClose: 3000,
        });
    };

    const handleEliminarCaja = (index) => {
        setCajasAsignadas(cajasAsignadas.filter((_, i) => i !== index));
    };

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando datos...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Inicio de caja</h1>
            <ToastContainer />
            <form onSubmit={handleAgregarCaja} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Divisa</label>
                        <select
                            value={divisaSeleccionada}
                            onChange={(e) => setDivisaSeleccionada(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        >
                            {divisas.map((divisa) => (
                                <option key={divisa.id} value={divisa.name}>
                                    {divisa.name} ({divisa.symbol})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Asignar Caja a</label>
                        <select
                            value={usuarioSeleccionado}
                            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        >
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.name}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2 flex justify-end mt-6">
                        <button
                            type="submit"
                            className="text-white bg-gray-900 py-3 px-6 rounded-md transition duration-300"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-6">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Divisa</th>
                            <th className="px-4 py-2 border">Cantidad</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cajasAsignadas.length > 0 ? (
                            cajasAsignadas.map((caja, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 border">{caja.divisa}</td>
                                    <td className="px-4 py-2 border">{caja.cantidad}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleEliminarCaja(index)}>
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    No hay cajas agregadas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div className="mt-6 flex justify-end">
                <button
                    disabled={cajasAsignadas.length === 0}
                    className={`py-3 px-6 rounded-md transition duration-300 ${cajasAsignadas.length > 0 ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                >
                    Generar Caja
                </button>
            </div>
        </div>
    );
};

export default CajasInicio;
