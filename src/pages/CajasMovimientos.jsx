import { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCajas } from "../services/api";

const CajasMovimientos = () => {
    const [cajasMovimientos, setCajasMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCajasMovimientos = async () => {
            try {
                const data = await fetchCajas();
                setCajasMovimientos(data);
            } catch (err) {
                setError(err.message);
                toast.error("Error al cargar los movimientos de cajas: " + err.message, {
                    autoClose: 3000,
                });
            } finally {
                setLoading(false);
            }
        };

        getCajasMovimientos();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "Fecha", accessor: (row) => new Date(row.date).toLocaleString() },
            { Header: "Divisas", accessor: (row) => `${row.currency_id.name} (${row.currency_id.symbol})` },
            { Header: "Estado", accessor: "status" },
            { Header: "Cantidad", accessor: "mount" },
            { Header: "Caja", accessor: "point_of_sell.name" },
        ],
        []
    );

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
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: cajasMovimientos,
            initialState: { pageIndex: 0, pageSize: 15 }, 
        },
        usePagination
    );

    if (loading) {
        return <div className="text-center p-6 text-gray-700">Cargando movimientos...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Movimientos de Cajas</h1>
            <ToastContainer />

            <div className="mt-6 overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg text-center">
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
                                            <td {...cell.getCellProps()} className="px-4 py-2 border">
                                                {cell.render("Cell")}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No hay movimientos registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                >
                    Anterior
                </button>
                <span className="px-4 py-2 mx-1">
                    Página {pageIndex + 1} de {pageOptions.length}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded-md"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default CajasMovimientos;
