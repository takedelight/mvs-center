import type { ColumnDef } from '@tanstack/react-table';
import type { Statement } from '../model/statement.type';

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
      header: 'Статус',
      cell: ({ row }) => {
        const status = row.getValue('status');

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
