import { fetchDashboard } from '../services/api';
import React, { useEffect, useState } from 'react';

const DashboardContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDashboard();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-center text-gray-500">No hay datos disponibles.</p>;

  const { tableA, tableB, cards } = data;

  const renderTableA = () => (
    <div className="overflow-x-auto mb-6 w-full" style={{ height: '400px' }}>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Compra</th>
            <th className="px-4 py-2 border">Compra$</th>
            <th className="px-4 py-2 border">Compra Prom.</th>
            <th className="px-4 py-2 border">Venta</th>
            <th className="px-4 py-2 border">Venta$</th>
            <th className="px-4 py-2 border">Venta Prom.</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tableA.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 border">{item.name}</td>
              <td className="px-4 py-2 border">{item.buy}</td>
              <td className="px-4 py-2 border">{item['buy$']}</td>
              <td className="px-4 py-2 border">{item.averagebuy}</td>
              <td className="px-4 py-2 border">{item.sell}</td>
              <td className="px-4 py-2 border">{item['sell$']}</td>
              <td className="px-4 py-2 border">{item.averagesell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTableB = () => (
    <div className="overflow-x-auto mb-6 w-full" style={{ height: '400px' }}>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Compra</th>
            <th className="px-4 py-2 border">Venta$</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tableB.map((item, index) => (
            <React.Fragment key={index}>
              {item.users.map((user, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{user.user}</td>
                  <td className="px-4 py-2 border">{user.buy}</td>
                  <td className="px-4 py-2 border">{user['sell$']}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <div className="bg-white overflow-y-auto" style={{ height: '400px' }}>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Monto</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cards.box$.map((box, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border">{box.name}</td>
                <td className="px-4 py-2 border">{box.mount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white overflow-y-auto" style={{ height: '400px' }}>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Usuario</th>
              <th className="px-4 py-2 border">Compra</th>
              <th className="px-4 py-2 border">Venta$</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {tableB.map((item, index) => (
              <React.Fragment key={index}>
                {item.users.map((user, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{user.user}</td>
                    <td className="px-4 py-2 border">{user.buy}</td>
                    <td className="px-4 py-2 border">{user['sell$']}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {renderCards()}
      <div className="overflow-x-auto">
        <div className="w-full mb-6">
          {renderTableA()}
          {renderTableB()}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
