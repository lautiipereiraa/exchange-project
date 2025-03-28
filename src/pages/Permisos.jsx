import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchRolP } from "../services/api";
import { Switch } from "@headlessui/react";

const Permisos = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const rolesData = await fetchRolP();
                setRoles(rolesData);
                setLoading(false);
            } catch (error) {
                toast.error("Error al cargar los roles: " + error.message, {
                    autoClose: 3000,
                });
                setLoading(false);
            }
        };

        getRoles();
    }, []);

    const handleRoleChange = (e) => {
        const selectedRoleId = e.target.value;
        setSelectedRole(selectedRoleId);

        const role = roles.find((role) => role.id == selectedRoleId);
        if (role) {
            const parsedPermissions = JSON.parse(role.permissions);
            setPermissions(parsedPermissions);
        }
    };

    const togglePermission = (menu, submenu, type) => {
        const updatedPermissions = { ...permissions };
        updatedPermissions[menu][submenu][type] = !updatedPermissions[menu][submenu][type];
        setPermissions(updatedPermissions);
    };

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando datos...</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Permisos</h1>
            <ToastContainer />
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Seleccionar Rol</label>
                <select
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name} ({role.acronym})
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-2 border">Menu</th>
                            <th className="px-4 py-2 border">Submenu</th>
                            <th className="px-4 py-2 border">Ver</th>
                            <th className="px-4 py-2 border">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(permissions).map((menu) =>
                            Object.keys(permissions[menu]).map((submenu) => (
                                <tr key={`${menu}-${submenu}`} className="border-t">
                                    <td className="px-4 py-2 border">{menu}</td>
                                    <td className="px-4 py-2 border">{submenu}</td>
                                    <td className="px-4 py-2 border">
                                        <Switch
                                            checked={permissions[menu][submenu].ver}
                                            onChange={() => togglePermission(menu, submenu, "ver")}
                                            className={`${
                                                permissions[menu][submenu].ver
                                                    ? "bg-indigo-600"
                                                    : "bg-gray-200"
                                            } relative inline-flex items-center h-6 rounded-full w-11`}
                                        >
                                            <span className="sr-only">Ver</span>
                                            <span
                                                className={`${
                                                    permissions[menu][submenu].ver ? "translate-x-6" : "translate-x-1"
                                                } inline-block w-4 h-4 transform bg-white rounded-full transition`}
                                            />
                                        </Switch>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <Switch
                                            checked={permissions[menu][submenu].editar}
                                            onChange={() => togglePermission(menu, submenu, "editar")}
                                            className={`${
                                                permissions[menu][submenu].editar
                                                    ? "bg-indigo-600"
                                                    : "bg-gray-200"
                                            } relative inline-flex items-center h-6 rounded-full w-11`}
                                        >
                                            <span className="sr-only">Editar</span>
                                            <span
                                                className={`${
                                                    permissions[menu][submenu].editar ? "translate-x-6" : "translate-x-1"
                                                } inline-block w-4 h-4 transform bg-white rounded-full transition`}
                                            />
                                        </Switch>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Permisos;
