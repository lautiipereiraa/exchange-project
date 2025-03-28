import { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { fetchTransaccionPendientes } from "../services/api";
import { Check, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransaccionesVerPendientes = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarTransacciones = async () => {
            const loadingToast = toast.loading("Cargando transacciones...");
            try {
                const data = await fetchTransaccionPendientes();
                setTransacciones(data);
                toast.update(loadingToast, {
                    render: "Transacciones cargadas exitosamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(loadingToast, {
                    render: "Error al cargar transacciones",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            } finally {
                setCargando(false);
            }
        };

        cargarTransacciones();
    }, []);

    const columns = useMemo(
        () => [
            { Header: "Fecha", accessor: (row) => new Date(row.date).toLocaleDateString() },
            { Header: "Transacción", accessor: "type_transaction.name" },
            {
                Header: "Divisas",
                accessor: (row) => `${row.pair.currencyOrigin.symbol} / ${row.pair.currencyDestiny.symbol}`,
            },
            { Header: "Cantidad", accessor: "quantity" },
            { Header: "Precio", accessor: "price" },
            { Header: "Monto", accessor: "mount" },
            { Header: "Cliente", accessor: "customer.name" },
            {
                Header: "Acciones",
                accessor: "id",
                Cell: ({ row }) => (
                    <div className="flex justify-center space-x-2">
                        <button className="text-green-500 hover:text-green-700">
                            <Check size={20} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ),
            },
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
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: transacciones,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    );

    return (
        <div className="overflow-x-auto mb-6 w-full">
            <h1 className="text-2xl font-bold mb-6">Pendientes</h1>
            <ToastContainer />

            <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 shadow-md">
                <thead className="bg-gray-800 text-white">
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
                <tbody {...getTableBodyProps()} className="text-center">
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
                            <td colSpan="8" className="px-4 py-2 border text-gray-500">
                                No hay transacciones pendientes.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="px-4 py-2">
                    Página <strong>{pageIndex + 1}</strong>
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

export default TransaccionesVerPendientes;
