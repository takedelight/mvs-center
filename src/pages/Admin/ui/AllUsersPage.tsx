import { api } from '@/shared/api';
import { Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
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

      <div className="mt-3 border flex p-2 flex-col h-[700px]">
        <div className="flex-1 overflow-auto ">
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

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            Кількість користувачів {table.getFilteredRowModel().rows.length}
          </div>
        </div>
      </div>

      <EditUserDialog editingUser={editingUser} setEditingUser={setEditingUser} refetch={refetch} />
    </>
  );
};

