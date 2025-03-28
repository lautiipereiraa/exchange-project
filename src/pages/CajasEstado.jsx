import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCajas } from "../services/api";
import { FaPlus, FaMinus } from "react-icons/fa";

const CajasEstado = () => {
    const [cajasEstado, setCajasEstado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [montoInput, setMontoInput] = useState(0);
    const [accion, setAccion] = useState("");

    useEffect(() => {
        const getCajasEstado = async () => {
            try {
                const data = await fetchCajas();
                setCajasEstado(data);
                setLoading(false);
            } catch (error) {
                toast.error("Error al cargar el estado de las cajas: " + error.message, {
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };

        getCajasEstado();
    }, []);

    const openModal = (index, tipo) => {
        setAccion(tipo);
        setCurrentIndex(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setMontoInput(0);
    };

    const handleMontoChange = (e) => {
        setMontoInput(e.target.value);
    };

    const saveMonto = () => {
        const nuevasCajas = [...cajasEstado];
        if (accion === "aumentar") {
            nuevasCajas[currentIndex].mount += parseFloat(montoInput);
        } else if (accion === "disminuir") {
            if (nuevasCajas[currentIndex].mount - parseFloat(montoInput) >= 0) {
                nuevasCajas[currentIndex].mount -= parseFloat(montoInput);
            } else {
                toast.error("No se puede reducir más la cantidad", {
                    autoClose: 3000,
                });
                closeModal();
                return;
            }
        }
        setCajasEstado(nuevasCajas);
        toast.success("Monto actualizado", {
            autoClose: 3000,
        });
        closeModal();
    };

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando estado de cajas...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Estado de Cajas</h1>
            <ToastContainer />

            <div className="mt-6">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Divisa</th>
                            <th className="px-4 py-2 border">Cantidad</th>
                            <th className="px-4 py-2 border">Caja</th>
                            <th className="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cajasEstado.length > 0 ? (
                            cajasEstado.map((caja, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 border">
                                        {caja.currency_id.name} ({caja.currency_id.symbol})
                                    </td>
                                    <td className="px-4 py-2 border">{caja.mount}</td>
                                    <td className="px-4 py-2 border">{caja.point_of_sell.name}</td>
                                    <td className="px-4 py-2 border flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => openModal(index, "aumentar")}
                                            className="text-green-500 hover:text-green-700"
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            onClick={() => openModal(index, "disminuir")}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaMinus />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No hay cajas registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Ingresar monto</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Monto a {accion === "aumentar" ? "aumentar" : "disminuir"}
                            </label>
                            <input
                                type="number"
                                value={montoInput}
                                onChange={handleMontoChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Monto"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveMonto}
                                className="bg-gray-900 text-white px-4 py-2 rounded-md"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CajasEstado;
