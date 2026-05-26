import { lazy, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Inbox } from 'lucide-react';

import { api } from '@/shared/api';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Spinner,
} from '@/shared/ui';
import { UserCarsTableColumns, type Car } from '@/entity/car';

interface ApiResponse {
  __type: string;
  size: number;
  state: {
    heap: Car[];
  };
  total: number;
  page: number;
  lastPage: number;
}
export const CarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort_by') || 'createdAt';
  const sortOrder = (searchParams.get('sort_order') as 'asc' | 'desc') || 'desc';
  const searchValue = searchParams.get('q') || '';

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 14,
  });

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  const { data, isPending } = useQuery<ApiResponse>({
    queryKey: ['cars', searchValue, pageSize, pageIndex, sortBy, sortOrder],
    refetchOnWindowFocus: false,
    queryFn: () =>
      api
        .get('/car', {
          params: {
            q: searchValue || undefined,
            sortBy,
            sortOrder,
            limit: pageSize,
            page: pageIndex + 1,
          },
        })
        .then((res) => res.data),
  });

  console.log(data);

  const handleSort = (field: string, order: 'asc' | 'desc' | null) => {
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      if (!order) {
        nextParams.delete('sort_by');
        nextParams.delete('sort_order');
      } else {
        nextParams.set('sort_by', field);
        nextParams.set('sort_order', order);
      }
      return nextParams;
    });
  };

  const columns = useMemo(
    () =>
      UserCarsTableColumns({
        sortBy,
        sortOrder,
        onSort: handleSort,
      }),
    [sortBy, sortOrder],
  );

  const table = useReactTable({
    data: data?.state?.heap ?? [],
    columns: columns,
    pageCount: Math.ceil((data?.total ?? 0) / pageSize) || 1,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="mt-3 rounded-lg flex flex-col h-[85vh] justify-between bg-background p-1">
      <div className="flex-1 overflow-auto border rounded-md relative">
        <Table className="w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headersGroup) => (
              <TableRow key={headersGroup.id}>
                {headersGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold text-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[80vh] text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Spinner className="size-7" />
                    <span className="text-sm font-medium">Завантаження автомобілів...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-72 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Inbox className="size-8" />
                    <span className="text-sm font-medium">Немає автомобілів</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground font-medium">
          Сторінка {table.getState().pagination.pageIndex + 1} з {Math.max(1, table.getPageCount())}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isPending}
          >
            Попередня
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isPending}
          >
            Наступна
          </Button>
        </div>
      </div>
    </div>
  );
};

export const LazyCarsPage = lazy(() => Promise.resolve({ default: CarsPage }));
