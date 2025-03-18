import React, { useEffect, useState } from 'react';
import { fetchDivisas } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DivisasTable = () => {
    const [divisas, setDivisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {       
        const getDivisas = async () => {
            const loadingToast = toast.loading("Cargando divisas...");

            try {
                const divisasData = await fetchDivisas();
                setDivisas(divisasData);

                toast.update(loadingToast, {
                    render: "Datos cargados exitosamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (err) {
                setError('Error al obtener los datos de la API.');

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

        getDivisas();
    }, []);

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Divisas</h2>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Símbolo</th>
                            <th className="px-4 py-2 border">Fecha de Creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisas.map((divisa) => (
                            <tr key={divisa.id} className="border-t">
                                <td className="px-4 py-2 border text-center">{divisa.id}</td>
                                <td className="px-4 py-2 border text-center">{divisa.name}</td>
                                <td className="px-4 py-2 border text-center">{divisa.symbol}</td>
                                <td className="px-4 py-2 border text-center">{new Date(divisa.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DivisasTable;
