import React, { useEffect, useState } from "react";
import { fetchTransaccion } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTable, usePagination } from "react-table";

const TransaccionPage = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTransacciones = async () => {
      const loadingToast = toast.loading("Cargando transacciones...");

      try {
        const data = await fetchTransaccion();
        setTransacciones(data);

        toast.update(loadingToast, {
          render: "Datos cargados exitosamente",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        setError(err.message);

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

    getTransacciones();
  }, []);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Tipo", accessor: "type_transaction.name" },
      { Header: "Par", accessor: "pair.name" },
      { Header: "Cantidad", accessor: "quantity" },
      { Header: "Precio", accessor: "price" },
      { Header: "Monto", accessor: "mount" },
      { Header: "Estado", accessor: "status" },
      { Header: "Punto de Venta", accessor: "point_of_sell.name" },
      { Header: "Cajero", accessor: "point_of_sell.user.name" },
      { Header: "Cliente", accessor: "customer.name" },
      { Header: "Fecha", accessor: (row) => new Date(row.date).toLocaleString() },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: transacciones,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    usePagination
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Transacciones</h2>
      <ToastContainer />

      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full border border-gray-300">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-900 text-white">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="p-3 border">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="text-center bg-gray-100 border-b hover:bg-gray-200">
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-2 border">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
        >
          Anterior
        </button>
        <span className="px-4 py-2 mx-1">
          Página {pageIndex + 1} de {pageCount}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
        >
          Siguiente
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default TransaccionPage;
