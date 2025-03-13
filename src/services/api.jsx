import axios from 'axios';

const url = "http://localhost:8000/";

export const fetchClientes = async () => {
  try {
    const token = localStorage.getItem('access_token');  

    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const response = await axios.get('http://localhost:8000/api/cliente', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data; 
  } catch (error) {
    throw new Error('Error al obtener los datos de los clientes: ' + (error.response?.data?.message || error.message));
  }
};


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
