import { api } from '@/shared/api';
import { useDebouce } from '@/shared/hooks/useDebounce';
import {
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { Inbox, Search } from 'lucide-react';
import { useState } from 'react';

interface Ticket {
  id: string;
  type: string;
  isComplete: boolean;
  completedAt: Date | null;
  createdAt: Date;
}
export const StatementsPage = () => {
  const [query, setQuery] = useState('');

  const dbValue = useDebouce(query, 1000);

  const url = dbValue ? `/ticket?q=${dbValue}` : `/ticket`;

  const { data, isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets', dbValue],
    refetchOnWindowFocus: true,
    queryFn: () => api.get(url).then((data) => data.data),
  });

  return (
    <>
      <h1 className="font-semibold mb-5 text-2xl mt-3">Мої заяви</h1>

      <div className="flex items-center  gap-1 px-2  rounded-md  border">
        <label htmlFor="search">
          <Search />
        </label>

        <Input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-none outline-0 focus-visible:ring-0 "
          placeholder="Знайти заяви за id, ПІБ  або email"
        />
      </div>

      <div className="mt-1 border rounded-md h-[500px] overflow-y-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[100px]">id</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Створено</TableHead>
              <TableHead className="text-right">Дата виконання</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Spinner />
                </TableCell>
              </TableRow>
            )}

            {data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="p-0 ">
                  <div className="flex flex-col items-center justify-center min-h-[450px] gap-2">
                    <Inbox size={40} />
                    <span>На даний момент ви не маєте заяв.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {data?.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.type}</TableCell>
                <TableCell>{s.isComplete ? 'Виконано' : 'Не виконано'}</TableCell>
                <TableCell className="text-right">
                  {new Date(s.createdAt).toLocaleDateString('uk-UA')}
                </TableCell>
                <TableCell className="text-right">
                  {s.completedAt
                    ? new Date(s.completedAt).toLocaleDateString('uk-UA')
                    : 'Не виконано'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

