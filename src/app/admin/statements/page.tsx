import { AdminStatementTableColumns } from '@/entity/statement';
import { StatementsFilter } from '@/features/statements-filter';
import { useFilter } from '@/features/statements-filter/hooks/useFilter';
import { api } from '@/shared/api';
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { lazy, useMemo } from 'react';

const AllStatementsPage = () => {
  const { order, searchValue, sortKey } = useFilter();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['allStatements', order, searchValue, sortKey.value],
    refetchOnWindowFocus: false,
    initialData: {
      result: [],
      time: 0,
      operations: 0,
    },
    queryFn: async () =>
      api
        .get('ticket/all', { params: { order, q: searchValue, sort_by: sortKey.value } })
        .then((res) => res.data),
  });

  const columns = useMemo(() => AdminStatementTableColumns({ refetch }), [refetch]);

  const table = useReactTable({
    data: data?.result ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Всі заявки</h1>

      <StatementsFilter />

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
              {isLoading && (
                <TableRow>
                  <TableCell>
                    <Spinner />
                  </TableCell>
                </TableRow>
              )}

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
