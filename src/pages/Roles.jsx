import { useEffect, useState } from "react";
import { fetchRoles } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const cargarRoles = async () => {
            const loadingToast = toast.loading("Cargando roles...");
            try {
                const data = await fetchRoles();
                setRoles(data);
                toast.update(loadingToast, {
                    render: "Roles cargados exitosamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(loadingToast, {
                    render: "Error al cargar roles",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        };
        cargarRoles();
    }, []);

    return (
        <div className="overflow-x-auto mb-6 w-full" style={{ height: "400px" }}>
            <ToastContainer />
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Acrónimo</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {roles.map((rol) => (
                        <tr key={rol.id} className="border-t">
                            <td className="px-4 py-2 border">{rol.name}</td>
                            <td className="px-4 py-2 border">{rol.acronym}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Roles;
