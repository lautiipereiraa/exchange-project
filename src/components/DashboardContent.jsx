import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/api'; 

const DashboardContent = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        const rates = await fetchExchangeRates();
        const formattedData = Object.keys(rates).slice(0, 100).map((currency) => ({
          currency: currency,
          rate: rates[currency],
          high: (rates[currency] * 1.1).toFixed(4),  
          low: (rates[currency] * 0.9).toFixed(4),   
          last_updated: new Date().toLocaleString(), 
          symbol: currency.substring(0, 3),         
          country: getCountryName(currency),        
          description: `La tasa de cambio de ${currency} a EUR`,
        }));

        setExchangeRates(formattedData);
      } catch (err) {
        setError('Error al obtener los datos de la API.');
      } finally {
        setLoading(false);
      }
    };

    getRates();
  }, []);

  const getCountryName = (currencyCode) => {
    const countryMapping = {
      USD: 'Estados Unidos',
      GBP: 'Reino Unido',
      EUR: 'Zona Euro',
      JPY: 'Japón',
      CAD: 'Canadá',
      AUD: 'Australia',
    };
    return countryMapping[currencyCode] || 'Desconocido';
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cotización de Monedas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-4 py-2 border">Moneda</th>
              <th className="px-4 py-2 border">Valor en EUR</th>
              <th className="px-4 py-2 border">Símbolo</th>
              <th className="px-4 py-2 border">País</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Max. Día (High)</th>
              <th className="px-4 py-2 border">Min. Día (Low)</th>
              <th className="px-4 py-2 border">Última Actualización</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((rate, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border text-center">{rate.currency}</td>
                <td className="px-4 py-2 border text-center">{rate.rate.toFixed(4)}</td>
                <td className="px-4 py-2 border text-center">{rate.symbol}</td>
                <td className="px-4 py-2 border text-center">{rate.country}</td>
                <td className="px-4 py-2 border text-center">{rate.description}</td>
                <td className="px-4 py-2 border text-center">{rate.last_updated}</td>
                <td className="px-4 py-2 border text-center">{rate.high}</td>
                <td className="px-4 py-2 border text-center">{rate.low}</td>
                <td className="px-4 py-2 border text-center">{rate.last_updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContent;
