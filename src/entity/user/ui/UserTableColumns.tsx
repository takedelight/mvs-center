import type { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from '@/shared/ui';
import { MoreHorizontal } from 'lucide-react';
import { api } from '@/shared/api';
import { toast } from 'react-toastify';
import type { User } from '../model/user.type';

interface UserTableColumnsProps {
  userId: string;
  refetchUsers: () => void;
  onEdit: (user: User) => void;
}

export const UserTableColumns = ({
  userId,
  refetchUsers,
  onEdit,
}: UserTableColumnsProps): ColumnDef<User>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => {
        const id = row.getValue<string>('id');
        return <div className="normal-case">{id.slice(0, 8)}</div>;
      },
    },
    { accessorKey: 'firstName', header: "Ім'я" },
    { accessorKey: 'lastName', header: 'Прізвище' },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div className="normal-case">{row.getValue('email')}</div>,
    },
    { accessorKey: 'role', header: 'Роль' },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const user = row.original;

        const handleDelete = async () => {
          try {
            const res = await api.delete(`/user/delete/${user.id}`);
            toast.success(res.data.message);
            refetchUsers();
          } catch {
            toast.error('Не вдалося видалити користувача');
          }
        };

        const isMe = userId === user.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(user)}>Редагувати</DropdownMenuItem>
              <DropdownMenuItem disabled={isMe} onClick={handleDelete} className="text-red-500">
                Видалити
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
