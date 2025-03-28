import Par from "./pages/Par";
import Login from "./pages/Login";
import CajasPage from "./pages/Cajas";
import Clientes from "./pages/Clientes";
import MontosPage from "./pages/Montos";
import Dashboard from "./pages/Dashboard";
import DivisasTable from "./pages/Divisas";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "./components/ProtectedLayout";
import TransaccionPage from "./pages/Transacciones";
// import TransaccionDetalladaPage from "./pages/TransaccionesDetalladas";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Usuarios from "./pages/Usuarios";
import Roles from "./pages/Roles";
import TransaccionNueva from "./pages/TransaccionNueva";
import TransaccionVerPendiente from "./pages/TransaccionVerPendiente"; 
import TransaccionPendiente from "./pages/TransaccionPendiente";
import CajasInicio from "./pages/CajasInicio";
import CajasMovimientos from "./pages/CajasMovimientos";
import CajasEstado from "./pages/CajasEstado";
import Cotizaciones from "./pages/Cotizaciones";
import Permisos from "./pages/Permisos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          {/* Hecho */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/divisas" element={<DivisasTable />} />
          <Route path="/par" element={<Par />} />
          <Route path="/puntos-cambios" element={<CajasPage />} />
          <Route path="/transacciones" element={<TransaccionPage />} />
          <Route path="/montos" element={<MontosPage />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/transacciones/nueva" element={<TransaccionNueva />} />
          <Route path="/transacciones/ver-pendientes" element={<TransaccionVerPendiente />} />
          <Route path="/transacciones/pendientes" element={<TransaccionPendiente />} />
          <Route path="/caja/inicio" element={<CajasInicio />} />
          <Route path="/caja/movimientos" element={<CajasMovimientos />} />
          <Route path="/caja/estado" element={<CajasEstado />} />
          <Route path="/cotizaciones/mostrar" element={<Cotizaciones />} />
          <Route path="/permisos" element={<Permisos />} />

          {/* Sin hacer */}
          {/* Caja */}

          {/* Configuracion */}

          {/* Reveer */}
          {/* <Route path="/transacciones-detalladas" element={<TransaccionDetalladaPage />} /> */}
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
      />
    </Router>
  );
};

export default App;
