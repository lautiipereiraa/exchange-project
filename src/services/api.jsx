import axios from 'axios';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get('https://cdn.dinero.today/api/ecb.json');
    return response.data.rates; 
  } catch (error) {
    throw new Error('Error al obtener los datos de la API');
  }
};
