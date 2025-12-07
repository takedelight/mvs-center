import type { ColumnDef } from '@tanstack/react-table';
import type { Statement } from '../model/statement.type';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui';
import { CircleQuestionMark } from 'lucide-react';

export const StatementTableColumns = (): ColumnDef<Statement>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => {
        const id = row.getValue<number>('id');
        return <div className="normal-case">{id}</div>;
      },
    },

    {
      accessorKey: 'type',
      header: 'Тип',
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
  ];
};
