import React, { useEffect, useState } from 'react';
import { fetchDivisas } from '../services/api';
import { useTable, usePagination } from 'react-table'; // Importar hooks de react-table
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DivisasTable = () => {
    const [divisas, setDivisas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDivisas = async () => {
            const loadingToast = toast.loading("Cargando divisas...");

            try {
                const divisasData = await fetchDivisas();
                setDivisas(divisasData);

                toast.update(loadingToast, {
                    render: "Datos cargados exitosamente",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (err) {
                setError('Error al obtener los datos de la API.');

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

        getDivisas();
    }, []);

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    // Configurar las columnas de la tabla
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // Clave de la propiedad
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Símbolo',
                accessor: 'symbol',
            },
            {
                Header: 'Fecha de Creación',
                accessor: 'created_at',
                Cell: ({ value }) => new Date(value).toLocaleDateString(), // Formatear fecha
            },
        ],
        []
    );

    // Configurar la tabla con react-table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize },
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        previousPage,
        nextPage,
        setPageSize
    } = useTable(
        {
            columns,
            data: divisas,
            initialState: { pageIndex: 0 }, // Inicializar la página en la primera
        },
        usePagination // Habilitar la paginación
    );

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Divisas</h2>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-900 text-white">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-4 py-2 border">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="border-t">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-4 py-2 border text-center">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center items-center mt-4 space-x-4">
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                    Anterior
                </button>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default DivisasTable;
