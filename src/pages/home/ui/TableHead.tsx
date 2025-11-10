import { TableHeader as THeader, TableHead, TableRow } from '@/shared/ui';

export const TableHeader = () => (
    <THeader className="bg-background">
        <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead className="text-center">Тип</TableHead>
            <TableHead>Клієнт</TableHead>
            <TableHead>Пріоритет</TableHead>
            <TableHead className="text-center">Статус</TableHead>
            <TableHead className="text-center">Дата створення</TableHead>
        </TableRow>
    </THeader>
);
