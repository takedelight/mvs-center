import { AdminStatementTableColumns } from '@/entity/ticket';
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
  type PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { lazy, useMemo, useState } from 'react';

const AllStatementsPage = () => {
  const { order, searchValue, sortKey } = useFilter();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 11,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['allStatements', order, searchValue, sortKey.value, pageIndex, pageSize],
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    initialData: {
      data: {
        result: [],
        time: 0,
        operations: 0,
      },
      total: 0,
      page: 1,
      lastPage: 0,
    },
    queryFn: async () =>
      api
        .get('ticket/all', {
          params: {
            order,
            q: searchValue,
            sort_by: sortKey.value,
            page: pageIndex + 1,
            limit: pageSize,
          },
        })
        .then((res) => res.data),
  });

  const columns = useMemo(() => AdminStatementTableColumns({ refetch }), [refetch]);

  const table = useReactTable({
    data: data?.data?.result ?? [],
    columns,
    pageCount: data?.lastPage ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Всі заявки</h1>

      <StatementsFilter />

      <div className="mt-2 border flex flex-col h-[650px]">
        <div className="flex-1 overflow-auto">
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <Spinner />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[540px] text-center align-middle text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t p-4 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Сторінка {table.getState().pagination.pageIndex + 1} з{' '}
              {table.getPageCount().toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Попередня
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Наступна
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const LazyAdminStatementsPage = lazy(() => Promise.resolve({ default: AllStatementsPage }));
