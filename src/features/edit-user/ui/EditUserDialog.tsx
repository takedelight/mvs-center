import { api } from '@/shared/api';
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  Spinner,
} from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import {} from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { toast } from 'react-toastify';

interface Props {
  editingUser: User | null;
  setEditingUser: Dispatch<SetStateAction<User | null>>;
  refetch: () => void;
}

interface UpdatedUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const EditUserDialog = ({ editingUser, setEditingUser, refetch }: Props) => {
  const [updatedUser, setUpdatedUser] = useState<UpdatedUserData>({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
  });
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (editingUser) {
      setUpdatedUser({
        email: editingUser.email,
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        role: editingUser.role,
      });

      setId(editingUser.id);
    }
  }, [editingUser]);

  const isDisabled =
    updatedUser.email === editingUser?.email &&
    updatedUser.firstName === editingUser?.firstName &&
    updatedUser.lastName === editingUser?.lastName &&
    updatedUser.role === editingUser?.role;

  const updateUserMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async () => {
      await api.patch(`/user/update/${id}`, {
        email: updatedUser.email,
        role: updatedUser.role,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      });
    },
    onSuccess: () => {
      setEditingUser(null);
      refetch();
      toast.success('Дані користувача успішно оновленно.');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return (
    <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
      <DialogContent className="max-w-[480px] p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Редагування користувача</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">
              Ім'я
            </label>
            <Input
              id="firstName"
              value={updatedUser.firstName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">
              Прізвище
            </label>
            <Input
              id="lastName"
              value={updatedUser.lastName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <Input
              id="email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              className="h-10 normal-case"
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="role" className="text-sm font-medium text-muted-foreground">
              Роль
            </label>

            <Select
              value={updatedUser.role}
              onValueChange={(value) => setUpdatedUser({ ...updatedUser, role: value })}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Оберіть роль" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem
                  onClick={() => setUpdatedUser((prev) => ({ ...prev, role: 'user' }))}
                  value="user"
                >
                  Користувач
                </SelectItem>

                <SelectItem
                  onClick={() => setUpdatedUser((prev) => ({ ...prev, role: 'operator' }))}
                  value="operator"
                >
                  Оператор
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setEditingUser(null)}
              type="button"
              className="h-10"
            >
              Скасувати
            </Button>

            <Button
              onClick={() => updateUserMutation.mutate()}
              disabled={isDisabled}
              type="button"
              className="h-10"
            >
              {updateUserMutation.isPending ? (
                <span className="flex items-center gap-1">
                  <Spinner />
                  Збереження
                </span>
              ) : (
                'Зберегти'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

