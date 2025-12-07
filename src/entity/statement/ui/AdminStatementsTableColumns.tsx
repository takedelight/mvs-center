import type { ColumnDef } from '@tanstack/react-table';
import type { AdminStatement } from '../model/statement.type';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';
import { CircleQuestionMark, MoreHorizontal } from 'lucide-react';
import { api } from '@/shared/api';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

interface Props {
  refetch: () => void;
}

export const AdminStatementTableColumns = ({ refetch }: Props): ColumnDef<AdminStatement>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => {
        const id = row.getValue<string>('id');
        return <div className="normal-case">{id}</div>;
      },
    },

    {
      accessorKey: 'type',
      header: 'Тип',
    },
    {
      header: 'ПІБ',
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;

        return (
          <div className="normal-case">
            {firstName} {lastName}
          </div>
        );
      },
    },

    {
      accessorKey: 'status',
      header: () => (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex gap-1 items-center cursor-help">
              Статус
              <CircleQuestionMark size={15} />
            </span>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <h3 className="font-semibold mb-2">Статуси заяв:</h3>

            <ul className="space-y-1">
              <li>
                <div>
                  <span className="text-green-700 font-semibold">Виконано</span> — оператор одобрив
                  вашу заяву.
                </div>
              </li>

              <li>
                <div>
                  <span className="text-red-700 font-semibold">Відхилено</span> — оператор відхилив
                  вашу заяву.
                </div>
              </li>

              <li>
                <div>
                  <span className="text-yellow-700 font-semibold">В обробці</span> — ваша заява
                  очікує, поки нею займуться.
                </div>
              </li>
            </ul>
          </TooltipContent>
        </Tooltip>
      ),

      cell: ({ row }) => {
        const status = row.getValue<string>('status');

        return (
          <div className="normal-case">
            {status === 'Виконано' && (
              <span className="text-green-700 font-semibold">Виконано</span>
            )}
            {status === 'Відхилено' && (
              <span className="text-red-500 font-semibold">Відхилено</span>
            )}
            {status === 'В обробці' && (
              <span className="text-yellow-600 font-semibold">В обробці</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Дата створення',
      cell: ({ row }) => {
        const raw = row.getValue<string>('createdAt');
        const formatted = new Date(raw).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        return <div className="normal-case">{formatted}</div>;
      },
    },

    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const { id } = row.original;

        const handleComplete = async () => {
          try {
            await api.post(`/ticket/complete/${id}`);

            refetch();
            toast.success('Заяву виконано.');
          } catch (error) {
            if (isAxiosError(error)) {
              toast.error(error.response?.data.message);
            }
          }
        };

        const handleReject = async () => {
          try {
            await api.post(`/ticket/reject/${id}`);

            refetch();
            toast.success('Заяву відхилено.');
          } catch (error) {
            if (isAxiosError(error)) {
              toast.error(error.response?.data.message);
            }
          }
        };
        const { status } = row.original;

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

              <DropdownMenuItem
                disabled={status === 'Виконано' || status === 'Відхилено'}
                onClick={handleComplete}
                className="text-green-700"
              >
                Виконати
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleReject}
                disabled={status === 'Виконано' || status === 'Відхилено'}
                className="text-red-500"
              >
                Відхилити
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

