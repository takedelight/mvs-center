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
      accessorKey: 'isComplete',
      header: 'Статус',
      cell: ({ row }) => {
        const isComplete = row.getValue('isComplete');

        return (
          <div className="normal-case">
            {isComplete ? (
              <span className="text-green-700 font-semibold">Виконано</span>
            ) : (
              <span className="text-red-500 font-semibold">Відмовлено</span>
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

    // {
    //   accessorKey: 'completedAt',
    //   header: 'Дата виконання',
    //   cell: ({ row }) => {
    //     const raw = row.getValue<string>('completedAt');

    //     if (!raw) {
    //       return <div className="text-red-500">—</div>;
    //     }

    //     const formatted = new Date(raw).toLocaleString('uk-UA', {
    //       day: '2-digit',
    //       month: '2-digit',
    //       year: 'numeric',
    //     });

    //     return <div className="normal-case text-green-700">{formatted}</div>;
    //   },
    // },
  ];
};
