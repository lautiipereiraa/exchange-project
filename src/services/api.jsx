import axios from 'axios';

const url = "http://localhost:8000/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(url + 'api/login', { email, password });

    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);

    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + (error.response?.data?.message || error.message));
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

export const fetchClientes = () => fetchData('cliente');
export const fetchDivisas = () => fetchData('divisa');
export const fetchTransaccion = () => fetchData('transaccion');
export const fetchTransaccionDetalladas= () => fetchData('transaccionespendiente');
export const fetchMontos = () => fetchData('montos');
export const fetchPar = () => fetchData('par');
export const fetchCajas = () => fetchData('punto');
