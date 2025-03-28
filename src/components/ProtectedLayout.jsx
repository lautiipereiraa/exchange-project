import Sidebar from "./Sidebar";
import TopBar from "./Topbar.jsx";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
