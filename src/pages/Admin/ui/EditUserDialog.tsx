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
} from '@/shared/ui';
import type { User } from '@/widgets/header/ui/header';
import {} from '@radix-ui/react-dialog';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

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

  useEffect(() => {
    if (editingUser) {
      setUpdatedUser({
        email: editingUser.email,
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        role: editingUser.role,
      });
    }
  }, [editingUser]);

  const isDisabled =
    updatedUser.email === editingUser?.email &&
    updatedUser.firstName === editingUser?.firstName &&
    updatedUser.lastName === editingUser?.lastName &&
    updatedUser.role === editingUser?.role;

  const handleUpdate = async () => {
    const response = await api.patch('/user/update', {
      email: updatedUser.email,
      role: updatedUser.role,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    });

    setEditingUser(null);
    refetch();
  };

  return (
    <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
      <DialogContent className="max-w-[480px] p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Редагування користувача</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-2 gap-4">
          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Email */}
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

          {/* Role */}
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

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => setEditingUser(null)}
              type="button"
              className="h-10"
            >
              Скасувати
            </Button>

            <Button onClick={handleUpdate} disabled={isDisabled} type="button" className="h-10">
              Зберегти
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

