import { AdminStatementTableColumns, type AdminStatement } from '@/entity/statement';
import { ALGORITHMS, SORT_KEYS, StatementsFilter } from '@/features/statements-filter';
import { api } from '@/shared/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { lazy, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

type AlgorithmValue = (typeof ALGORITHMS)[number]['value'];

type SortOrder = 'asc' | 'desc';

const AllStatementsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchValue, setSearchValue] = useState('');

  const [sortKey, setSortKey] = useState(SORT_KEYS[2]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [algorithms, setAlgorithms] = useState<AlgorithmValue[]>([]);

  const [params, setParams] = useSearchParams();

  const query = useMemo(
    () => ({
      ...(searchValue && { q: searchValue }),
      sort_by: sortKey.value,
      order: sortOrder,
      ...(algorithms.length > 0 && { algorithms: algorithms.join(',') }),
    }),
    [searchValue, sortKey, sortOrder, algorithms],
  );

  console.log(sortKey.alias);

  useEffect(() => {
    setParams(query);
  }, [query, setParams]);

  const serializedParams = useMemo(() => Object.fromEntries(params.entries()), [params]);

  const { data = [], refetch } = useQuery<AdminStatement[]>({
    queryKey: ['allStatements', serializedParams],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('ticket/all', { params: serializedParams }).then((data) => data.data),
  });

  const columns = useMemo(() => AdminStatementTableColumns({ refetch }), []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Всі заявки</h1>

      <StatementsFilter
        algorithms={algorithms}
        searchValue={searchValue}
        setAlgorithms={setAlgorithms}
        setSearchValue={setSearchValue}
        setSortKey={setSortKey}
        sortKey={sortKey}
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />

      <div className="mt-2 border flex flex-col h-[650px]">
        <div className="flex-1 overflow-auto max-h-[650px]">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headersGroup) => (
                <TableRow key={headersGroup.id}>
                  {headersGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export const LazyAdminStatementsPage = lazy(() => Promise.resolve({ default: AllStatementsPage }));
