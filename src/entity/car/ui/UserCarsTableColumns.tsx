import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/shared/ui';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { Car } from '../model/car.type';

interface ColumnProps {
  sortBy: string | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (field: string, order: 'asc' | 'desc' | null) => void;
}

export const UserCarsTableColumns = ({
  sortBy,
  sortOrder,
  onSort,
}: ColumnProps): ColumnDef<Car>[] => {
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
      accessorKey: 'plateNumber',
      header: () => renderSortableHeader('plateNumber', 'Держ. номер'),
      cell: ({ row }) => (
        <div className="font-mono uppercase tracking-wider bg-muted px-2 py-0.5 rounded border inline-block text-sm">
          {row.original.plateNumber}
        </div>
      ),
    },
    {
      accessorKey: 'brand',
      header: 'Марка',
      cell: ({ row }) => <div className="font-medium">{row.original.brand}</div>,
    },
    {
      accessorKey: 'modelName',
      header: 'Модель',
      cell: ({ row }) => <div>{row.original.modelName}</div>,
    },
    {
      accessorKey: 'vin',
      header: () => renderSortableHeader('vin', 'VIN код'),
      cell: ({ row }) => (
        <div className="font-mono uppercase tracking-wide">{row.original.vin}</div>
      ),
    },
    {
      accessorKey: 'year',
      header: () => renderSortableHeader('year', 'Рік випуску'),
      cell: ({ row }) => <div>{row.original.year}</div>,
    },
  ];
};
