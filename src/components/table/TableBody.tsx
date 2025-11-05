import { Inbox, RotateCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Loader } from '../ui/loader';
import { TableCell, TableRow, TableBody as TBody } from '../ui/table';
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { ApiResponse, Statement } from '@/types/statement.type';

type Props = {
    isLoading: boolean;
    isError: boolean;
    refetch: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<ApiResponse, Error>>;
    data: Statement[];
};

export const TableBody = ({ isError, isLoading, refetch, data }: Props) => {
    return (
        <TBody>
            {isLoading && (
                <TableRow>
                    <TableCell colSpan={6}>
                        <div className="flexitems-center justify-center">
                            <Loader />
                        </div>
                    </TableCell>
                </TableRow>
            )}

            {isError && (
                <TableRow>
                    <TableCell colSpan={999}>
                        <div className="flex flex-col items-center justify-center text-red-500 text-center py-10">
                            Помилка при завантаженні
                            <Button
                                onClick={() => refetch()}
                                className="mt-2 text-black"
                                variant="outline"
                            >
                                Спробувати знову <RotateCw />
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            )}

            {!isLoading && data?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6}>
                        <div className="flex items-center justify-center flex-col py-10 text-muted-foreground">
                            <Inbox className="h-8 w-8 mb-2" />
                            Записів немає
                        </div>
                    </TableCell>
                </TableRow>
            )}

            {data.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.type}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell className="text-center">
                        {new Date(item.createdAt).toLocaleDateString('uk-UA')}
                    </TableCell>
                </TableRow>
            ))}
        </TBody>
    );
};
