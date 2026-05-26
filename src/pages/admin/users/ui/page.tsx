import { api } from '@/shared/api';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { lazy, useMemo, useState } from 'react';
import { Inbox } from 'lucide-react';
import { UserTableColumns, type User } from '@/entity/user';
import { useAuth } from '@/core/auth';
import { EditUserDialog } from '@/features/edit-user';

interface ApiResponse {
  __type: string;
  size: number;
  state: {
    heap: User[];
  };
}

export const AllUsersPage = () => {
  const {
    value: { user },
  } = useAuth();
  const { id: userId } = user!;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, refetch: refetchUsers } = useQuery<ApiResponse>({
    queryKey: ['users'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('/user').then((res) => res.data),
  });

  console.log(data);

  const columns = useMemo(
    () =>
      UserTableColumns({
        userId,
        refetchUsers,
        onEdit: (targetUser) => setEditingUser(targetUser),
      }),
    [userId, refetchUsers],
  );

  const table = useReactTable({
    data: data?.state.heap ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="mt-3 border flex flex-col p-2 h-[85vh] justify-between">
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
                  <TableCell
                    colSpan={columns.length}
                    className="h-full flex justify-center text-center items-center gap-2"
                  >
                    <Inbox className="size-5 text-muted-foreground" />
                    Немає користувачів
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center border-t justify-between py-4">
          <span className="text-sm text-muted-foreground">
            Сторінка {table.getState().pagination.pageIndex + 1} з {table.getPageCount()}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Попередня
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Наступна
            </Button>
          </div>
        </div>
      </div>

      <EditUserDialog
        targetUser={editingUser}
        onClose={() => setEditingUser(null)}
        refetch={refetchUsers}
      />
    </>
  );
};

export const LazyAdminUsersPage = lazy(() => Promise.resolve({ default: AllUsersPage }));
