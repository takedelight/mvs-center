import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui';
import { CircleQuestionMark } from 'lucide-react';
import { useCreateTicket } from '../model/use-create-ticket';
import { TICKET_TYPES } from '@/entity/ticket';

export const CreateTicketForm = () => {
  const { createTicketMutation, selectedType, setSelectedType, VIN, setVIN, userInfo, isPending } =
    useCreateTicket();

  return (
    <Card className="w-150 p-2">
      <CardHeader>
        <h1 className="text-xl font-bold">Подача заяви</h1>
      </CardHeader>
      <CardContent>
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

          <Field>
            <FieldLabel htmlFor="vin" className="flex gap-1 items-center">
              VIN-номер
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark size={15} />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  17-значний код (наприклад, VF33H9HZC12345678). Вказаний у техпаспорті.
                </TooltipContent>
              </Tooltip>
            </FieldLabel>
            <FieldContent>
              <Input
                id="vin"
                value={VIN}
                onChange={(e) => setVIN(e.target.value)}
                placeholder="VIN-номер"
                type="text"
                name="vin"
              />
            </FieldContent>
          </Field>

          <Button
            type="submit"
            disabled={isPending}
            className="mt-2"
            onClick={() => createTicketMutation.mutate()}
          >
            {createTicketMutation.isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner />
                Створити заяву
              </span>
            ) : (
              'Створити заяву'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
