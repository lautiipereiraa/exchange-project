import axios from 'axios';

const url = "http://localhost:8000/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(url + "api/login", { email, password });

    const { access_token, Usuario } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(Usuario));

    return response.data;
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + (error.response?.data?.message || error.message));
  }
};

const fetchData = async (endpoint) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const response = await axios.get(`${url}api/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los datos: ' + (error.response?.data?.message || error.message));
  }
};

export const fetchTipoTransaccion = () => fetchData('tipoTransaccion');
export const fetchTransaccionPendientes = () => fetchData('transaccionespendiente');
export const fetchClientes = () => fetchData('cliente');
export const fetchDivisas = () => fetchData('divisa');
export const fetchTransaccion = () => fetchData('transaccion');
export const fetchMontos = () => fetchData('montos');
export const fetchPar = () => fetchData('par');
export const fetchPunto = () => fetchData('punto');
export const fetchUsuarios = () => fetchData('usuario');
export const fetchRoles = () => fetchData('rol');
export const fetchCajas = () => fetchData('cajas');
export const fetchRatio = () => fetchData('ratio');
export const fetchRolP = () => fetchData('rolp');
// export const fetchTransaccionDetalladas = () => fetchData('transaccionespendiente');

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const fetchDashboard = (startDate = getCurrentDate(), finishDate = getCurrentDate()) => {
  return fetchData(`dashboard?startDate=${startDate}&finishDate=${finishDate}`);
};
