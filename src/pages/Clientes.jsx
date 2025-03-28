import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { fetchClientes } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientesContent = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClientes = async () => {
      const loadingToast = toast.loading("Cargando clientes...");

      try {
        const clientesData = await fetchClientes();
        setClientes(clientesData);

        toast.update(loadingToast, {
          render: "Datos cargados exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        setError("Error al obtener los datos de la API.");

        toast.update(loadingToast, {
          render: "Error al cargar los datos",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    getClientes();
  }, []);

  // Definir las columnas para react-table
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Nombre", accessor: "name" },
      { 
        Header: "Fecha de Creación", 
        accessor: "created_at",
        Cell: ({ value }) => new Date(value).toLocaleDateString() 
      }
    ],
    []
  );

  // Configuración de la tabla con paginación
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data: clientes,
      initialState: { pageIndex: 0, pageSize: 15 } 
    },
    usePagination
  );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      <ToastContainer />
      
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-900 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2 border">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-t">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border text-center">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 border text-gray-500 text-center">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página <strong>{pageIndex + 1}</strong> de {pageOptions.length}
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ClientesContent;
