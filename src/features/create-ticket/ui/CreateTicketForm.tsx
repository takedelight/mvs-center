import type { Car } from '@/entity/car';
import { TICKET_TYPES } from '@/entity/ticket';
import { api } from '@/shared/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
} from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useCreateTicket } from '../model/use-create-ticket';

interface ApiResponse {
  __type: string;
  size: number;
  state: {
    heap: Car[];
  };
  total: number;
  page: number;
  lastPage: number;
}

export const CreateTicketForm = () => {
  const {
    createTicketMutation,
    selectedType,
    setTicket,
    ticket,
    setSelectedType,
    handleChange,
    isDisabled,
    userInfo,
    selectedCarId,
    setSelectedCarId,
    isPending,
  } = useCreateTicket();

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ['cars'],
    refetchOnWindowFocus: false,
    queryFn: () => api.get('/car').then((res) => res.data),
  });

  const selectedCar = data?.state.heap.find((car) => car.id === selectedCarId) || null;

  useEffect(() => {
    setTicket((p) => ({
      ...p,
      VIN: selectedCar?.vin ?? '',
      carNumber: selectedCar?.plateNumber ?? '',
    }));
  }, [selectedCar]);

  return (
    <Card className="w-150 p-2">
      <CardHeader className="px-2 ">
        <CardTitle className="text-xl">Нова заявка</CardTitle>
      </CardHeader>

      <CardContent className="px-2">
        <form className="flex flex-col gap-4">
          <FieldSet>
            <FieldGroup>
              <div className="flex gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">Ім'я</FieldLabel>
                  <FieldContent>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      disabled
                      placeholder="John"
                      type="text"
                      name="firstName"
                    />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Прізвище</FieldLabel>
                  <FieldContent>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      disabled
                      placeholder="Doe"
                      type="text"
                      name="lastName"
                    />
                  </FieldContent>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                value={userInfo.email}
                disabled
                placeholder="JohnDoe@example.com"
                type="email"
                name="email"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Тип заяви</FieldLabel>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Оберіть тип послуги" />
              </SelectTrigger>
              <SelectContent>
                {TICKET_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {selectedType && (
            <Field>
              <FieldLabel>Автомобіль</FieldLabel>
              <Select value={selectedCarId} onValueChange={setSelectedCarId} disabled={isLoading}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={isLoading ? 'Завантаження авто...' : 'Оберіть автомобіль'}
                  />
                </SelectTrigger>
                <SelectContent>
                  {data?.state.heap.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.brand} {car.modelName} ({car.plateNumber}) ({car.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}

          {selectedCar && (
            <div className="flex flex-col gap-4 ">
              <Field>
                <FieldLabel htmlFor="car-vin">VIN</FieldLabel>
                <FieldContent>
                  <Input id="car-vin" value={ticket.VIN} disabled type="text" name="car-vin" />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="carNumber">Державний номер</FieldLabel>
                <FieldContent>
                  <Input
                    id="carNumber"
                    value={ticket.carNumber}
                    disabled
                    type="text"
                    name="carNumber"
                  />
                </FieldContent>
              </Field>

              {selectedType === 'Заміна номерних знаків' && (
                <Field>
                  <FieldLabel htmlFor="new-car-number">Новий номер </FieldLabel>
                  <FieldContent>
                    <Input
                      id="newCarNumber"
                      onChange={(e) => handleChange(e)}
                      value={ticket.newCarNumber}
                      maxLength={8}
                      type="text"
                      name="newCarNumber"
                    />
                  </FieldContent>
                </Field>
              )}

              {selectedType === 'Зняття автомобіля з обліку' && (
                <Field>
                  <FieldLabel htmlFor="reason">Причина </FieldLabel>
                  <FieldContent>
                    <Textarea
                      id="reason"
                      className="h-40 resize-none"
                      onChange={(e) => handleChange(e)}
                      value={ticket.reason}
                      maxLength={460}
                      name="reason"
                    />
                  </FieldContent>
                </Field>
              )}
            </div>
          )}

          <Button
            type="button"
            disabled={isPending || isDisabled || !selectedCar}
            className="mt-2"
            onClick={() => createTicketMutation.mutate()}
          >
            {createTicketMutation.isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner />
                Створити заяву
              </span>
            ) : (
              `Подати  заяву: ${selectedType}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
