import type { ColumnDef } from '@tanstack/react-table';
import type { AdminStatementItem } from '../model/ticket.type';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { CircleQuestionMark, MoreHorizontal, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { api } from '@/shared/api';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

interface ColumnProps {
  refetch: () => void;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (field: string, order: 'asc' | 'desc' | null) => void;
}

export const AdminStatementTableColumns = ({
  refetch,
  sortBy,
  sortOrder,
  onSort,
}: ColumnProps): ColumnDef<AdminStatementItem>[] => {
  const renderSortableHeader = (field: string, title: string) => {
    const isCurrent = sortBy === field;

    const handleSort = () => {
      if (!isCurrent || sortOrder !== 'asc') {
        onSort(field, 'asc');
      } else {
        onSort(field, 'desc');
      }
    };
    return (
      <Button
        variant="ghost"
        onClick={handleSort}
        className="hover:bg-transparent p-0 font-semibold flex items-center gap-1.5"
      >
        {title}
        {!isCurrent || !sortOrder ? (
          <ArrowUpDown className="size-3.5 text-muted-foreground/70" />
        ) : sortOrder === 'asc' ? (
          <ArrowUp className="size-3.5 text-primary" />
        ) : (
          <ArrowDown className="size-3.5 text-primary" />
        )}
      </Button>
    );
  };
  return [
    {
      accessorKey: 'id',
      header: () => renderSortableHeader('id', 'Id'),
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: 'type',
      header: 'Тип',
      cell: ({ row }) => <div>{row.original.type}</div>,
    },
    {
      header: 'ПІБ',
      cell: ({ row }) => {
        const { firstName, lastName } = row.original.user;
        return (
          <div>
            {firstName} {lastName}
          </div>
        );
      },
    },

    {
      accessorKey: 'VIN',
      header: () => renderSortableHeader('VIN', 'VIN'),
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
                  заяву.
                </div>
              </li>
              <li>
                <div>
                  <span className="text-red-700 font-semibold">Відхилено</span> — оператор відхилив
                  заяву.
                </div>
              </li>
              <li>
                <div>
                  <span className="text-yellow-700 font-semibold">В обробці</span> — заява очікує
                  черги.
                </div>
              </li>
            </ul>
          </TooltipContent>
        </Tooltip>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div>
            {status === 'SUCCESS' && <span className="text-green-700 font-semibold">Виконано</span>}
            {status === 'REJECT' && <span className="text-red-500 font-semibold">Відхилено</span>}
            {status === 'PENDING' && (
              <span className="text-yellow-600 font-semibold">В обробці</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      id: 'createdAt',
      header: () => renderSortableHeader('createdAt', 'Дата створення'),
      cell: ({ row }) => {
        const raw = row.original.createdAt;
        const formatted = new Date(raw).toLocaleString('uk-UA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return <div>{formatted}</div>;
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const { id, status } = row.original;

        const handleComplete = async () => {
          try {
            await api.post(`/ticket/complete/${id}`);
            refetch();
            toast.success('Заяву виконано.');
          } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message);
          }
        };

        const handleReject = async () => {
          try {
            await api.post(`/ticket/reject/${id}`);
            refetch();
            toast.success('Заяву відхилено.');
          } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data.message);
          }
        };

        const isFinished = status === 'SUCCESS' || status === 'REJECT';

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
                disabled={isFinished}
                onClick={handleComplete}
                className="text-green-700 focus:text-green-700 focus:bg-green-50 cursor-pointer"
              >
                Виконати
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleReject}
                disabled={isFinished}
                className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
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
