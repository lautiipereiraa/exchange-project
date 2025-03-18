import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import Clientes from "./pages/Clientes";
import Par from "./pages/Par";
import ProtectedLayout from "./components/ProtectedLayout";
import "react-toastify/dist/ReactToastify.css";
import DivisasTable from "./pages/Divisas";
import CajasPage from "./pages/Cajas";
import TransaccionPage from "./pages/Transacciones";
import TransaccionDetalladaPage from "./pages/TransaccionesDetalladas";
import MontosPage from "./pages/Montos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/divisas" element={<DivisasTable />} />
          <Route path="/par" element={<Par />} />
          <Route path="/puntos-cambios" element={<CajasPage />} />
          <Route path="/transacciones" element={<TransaccionPage />} />
          <Route path="/transacciones-detalladas" element={<TransaccionDetalladaPage />} />
          <Route path="/transacciones-pendientes" element={<TransaccionDetalladaPage />} />
          <Route path="/montos" element={<MontosPage />} />
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
