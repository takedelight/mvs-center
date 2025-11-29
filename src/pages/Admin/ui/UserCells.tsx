import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '@/widgets/header/ui/header';
import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from '@/shared/ui';
import { MoreHorizontal } from 'lucide-react';
import { api } from '@/shared/api';
import { toast } from 'react-toastify';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  refetch: () => void;
  setEditingUser: Dispatch<SetStateAction<User | null>>;
}

export const getUserColumns = ({ refetch, setEditingUser }: Props): ColumnDef<User>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => {
      const id = row.getValue<string>('id');
      return <div className="normal-case">{id.slice(0, 8)}</div>;
    },
  },

  {
    accessorKey: 'firstName',
    header: "Ім'я",
  },

  {
    accessorKey: 'lastName',
    header: 'Прізвище',
  },

  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="normal-case">{row.getValue('email')}</div>,
  },

  {
    accessorKey: 'role',
    header: 'Роль',
  },

  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const user = row.original;

      const handleDelete = async () => {
        const res = await api.delete(`/user/delete/${user.id}`);
        toast.success(res.data.message);
        refetch();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Дії</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Копіювати id
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setEditingUser(user)}>Редагувати</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
              Видалити
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

