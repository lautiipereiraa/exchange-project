import { useEffect, useState } from "react";

const TopBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  if (!user) {
    return (
      <div className="bg-gray-800 text-white px-6 py-3 shadow-md">
        <h1 className="text-lg font-semibold">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="text-white px-6 py-3 flex justify-between items-center shadow-md" style={{ backgroundColor: "#1a1c46" }}>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user.name} - <strong>{user.rol.name}</strong>
        </span>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default TopBar;
