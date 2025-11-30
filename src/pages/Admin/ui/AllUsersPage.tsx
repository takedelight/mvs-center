import { api } from '@/shared/api';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
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
import { useEffect, useMemo, useState } from 'react';
import { getUserColumns } from './UserCells';
import { EditUserDialog } from './EditUserDialog';
import { Search } from 'lucide-react';
import { CreateUserDialog } from './CreateUserDialog';
import { DeleteButton } from './DeleteButton';

export const AllUsersPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data = [], refetch } = useQuery<User[]>({
    queryKey: ['users'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('/user').then((data) => data.data),
  });

  console.log(selectedIds);

  const columns = useMemo(() => getUserColumns({ refetch, setEditingUser }), []);

  const table = useReactTable({
    data,
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

  useEffect(() => {
    const selected = table.getSelectedRowModel().rows.map((r) => r.original.id);
    setSelectedIds(selected);
  }, [table, rowSelection]);

  return (
    <>
      <h1 className="font-semibold text-2xl mt-3">Всі користувачі</h1>

      <div className="  flex justify-between items-center  ">
        <label className="flex border rounded-md px-2 w-[300px] items-center" htmlFor="search-user">
          <Search />
          <Input
            id="search-user"
            className="border-0 outline-0 focus-visible:ring-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Пошук за email, ПІБ або id"
          />

          <span>ДОРОБИТИ</span>
        </label>

        <div className="flex items-center gap-2 ">
          <CreateUserDialog refetch={refetch} />
          <DeleteButton refetch={refetch} ids={selectedIds} />
        </div>
      </div>

      <div className="mt-3 border flex flex-col p-2 h-[620px] justify-between">
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
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

      <EditUserDialog editingUser={editingUser} setEditingUser={setEditingUser} refetch={refetch} />
    </>
  );
};

