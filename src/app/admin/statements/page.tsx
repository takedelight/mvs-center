import { AdminStatementTableColumns, type AdminStatement } from '@/entity/statement';
import type { User } from '@/entity/user';
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
import { lazy, useMemo, useState } from 'react';

const AllStatementsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data = [], refetch } = useQuery<AdminStatement[]>({
    queryKey: ['allStatements'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('ticket/all').then((data) => data.data),
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

      <div className="mt-5 border flex flex-col h-[650px]">
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
