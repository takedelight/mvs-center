import { UserTicketsTableColumns, type Ticket } from '@/entity/ticket';
import { api } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

export const useTicketsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 18 });

  const columns = useMemo(() => UserTicketsTableColumns(), []);

  const { data } = useQuery<{ data: Ticket[]; total: number }>({
    queryKey: ['user-tickets', pagination.pageIndex, pagination.pageSize],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await api
        .get(`/ticket?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .then((res) => res.data),
  });

  console.log(data);

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: data?.total ?? 0,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return { table, data, columns };
};
