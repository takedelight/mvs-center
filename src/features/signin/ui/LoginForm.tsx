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
import { useLogin } from '../model/use-login';

export const LoginForm = () => {
  const { inputValues, handleChange, handleSubmit, isPending, isDisabled } = useLogin();

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Вхід у обліковий запис</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldSet>
            <FieldGroup className="flex flex-col gap-4">
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
                  />
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>

          <Button
            type="submit"
            disabled={isDisabled || isPending}
            className="uppercase tracking-wide mt-2"
          >
            {isPending ? (
              <span className="flex gap-1 items-center">
                <Spinner /> Увійти
              </span>
            ) : (
              <span>Увійти</span>
            )}
          </Button>

          <span className="block text-sm text-muted-foreground text-center">
            Ще немає акаунту?{' '}
            <Link
              to="/register"
              className="text-black underline transition-colors ease-in-out duration-150 hover:text-neutral-800"
            >
              Зареєструватися
            </Link>
          </span>
        </form>
      </CardContent>
    </Card>
  );
};
