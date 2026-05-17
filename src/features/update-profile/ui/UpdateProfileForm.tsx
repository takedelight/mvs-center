import {
  Button,
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Spinner,
} from '@/shared/ui';
import { useUpdateProfile } from '../model/use-update-profile';

export const UpdateForm = () => {
  const { userInfo, handleChange, updateProfileInfoMutation, isDidabled } = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDidabled) {
      updateProfileInfoMutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 mt-2">
      <FieldSet>
        <FieldGroup className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-4">
            <Field className="w-[400px]">
              <FieldLabel htmlFor="firstName">Ім'я</FieldLabel>
              <FieldContent>
                <Input
                  id="firstName"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                />
              </FieldContent>
            </Field>
            <Field className="w-[400px]">
              <FieldLabel htmlFor="lastName">Прізвище</FieldLabel>
              <FieldContent>
                <Input
                  id="lastName"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                />
              </FieldContent>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <Button type="submit" disabled={isDidabled || updateProfileInfoMutation.isPending}>
        {updateProfileInfoMutation.isPending ? (
          <span className="flex gap-2 items-center">
            <Spinner /> Збереження
          </span>
        ) : (
          <span>Зберегти зміни</span>
        )}
      </Button>
    </form>
  );
};
