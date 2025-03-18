import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const ProtectedLayout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login"; 

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default ProtectedLayout;
