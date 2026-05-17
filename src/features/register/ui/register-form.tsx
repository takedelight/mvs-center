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
  Spinner,
} from '@/shared/ui';
import { Link } from 'react-router';
import { useRegister } from '../model/use-register';

export const RegisterForm = () => {
  const { handleChange, isPending, handleSubmit, inputValues, isDisabled } = useRegister();

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Реєстрація нового користувача</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <div className="flex gap-2 items-center">
                {' '}
                <Field>
                  <FieldLabel htmlFor="firstName">Ім'я</FieldLabel>
                  <FieldContent>
                    <Input
                      value={inputValues.firstName}
                      onChange={handleChange}
                      id="firstName"
                      placeholder="John"
                      type="text"
                      name="firstName"
                      required
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Прізвище</FieldLabel>
                  <FieldContent>
                    <Input
                      value={inputValues.lastName}
                      onChange={handleChange}
                      id="lastName"
                      placeholder="Doe"
                      type="text"
                      name="lastName"
                      required
                    />
                  </FieldContent>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <Input
                    value={inputValues.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="JohnDoe@example.com"
                    type="email"
                    name="email"
                    required
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <FieldContent>
                  <Input
                    value={inputValues.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="********"
                    type="password"
                    name="password"
                    required
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <Field className="flex flex-col gap-2">
              <FieldContent>
                <Button type="submit" disabled={isPending || isDisabled} className="w-full">
                  {isPending ? (
                    <span className="flex gap-1 items-center">
                      <Spinner /> Зареєструватися
                    </span>
                  ) : (
                    'Зареєструватися'
                  )}
                </Button>

                <span className="block text-sm text-muted-foreground text-center">
                  Вже маєте акаунт?
                  <Link
                    to="/signin"
                    className="text-black underline transition-colors hover:text-neutral-800"
                  >
                    Увійти
                  </Link>
                </span>
              </FieldContent>
            </Field>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
};
