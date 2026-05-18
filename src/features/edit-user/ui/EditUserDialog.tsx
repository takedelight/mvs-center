import { useAuth } from '@/core/auth';
import { api } from '@/shared/api';
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  Spinner,
  Checkbox,
  Field,
  FieldContent,
  FieldLabel,
} from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { User } from '@/entity/user';

interface EditUserDialogProps {
  targetUser: User | null;
  onClose: () => void;
  refetch: () => void;
}

export const EditUserDialog = ({ targetUser, onClose, refetch }: EditUserDialogProps) => {
  const {
    value: { user: currentUser },
    actions: { refetchProfile },
  } = useAuth();

  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (targetUser) {
      setRole(targetUser.role);
    }
  }, [targetUser]);

  const isDisabled = role === targetUser?.role;

  const updateUserMutation = useMutation({
    mutationKey: ['updateUser', targetUser?.id],
    mutationFn: async () => {
      if (!targetUser?.id) return;
      await api.patch(`/user/update/${targetUser.id}`, { role });
    },
    onSuccess: async () => {
      onClose();
      if (targetUser?.id === currentUser?.id) {
        await refetchProfile();
      }
      refetch();
      toast.success('Дані користувача успішно оновлено.');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Помилка оновлення');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled && !updateUserMutation.isPending) {
      updateUserMutation.mutate();
    }
  };

  const isOperator = role === 'OPERATOR';

  const handleCheckboxChange = (checked: boolean) => {
    setRole(checked ? 'OPERATOR' : 'USER');
  };

  return (
    <Dialog open={!!targetUser} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-120 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Редагування користувача</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <Field className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 bg-muted/20">
            <FieldContent>
              <Checkbox
                id="operator-role"
                checked={isOperator}
                onCheckedChange={handleCheckboxChange}
              />
            </FieldContent>
            <div className="space-y-1 leading-none">
              <FieldLabel htmlFor="operator-role" className="text-sm font-medium cursor-pointer">
                Надати права оператора
              </FieldLabel>
              <p className="text-xs text-muted-foreground">
                Дозволяє користувачу переглядати та керувати загальною базою заяв сервісного центру.
              </p>
            </div>
          </Field>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose} className="h-10">
              Скасувати
            </Button>

            <Button
              disabled={isDisabled || updateUserMutation.isPending}
              type="submit"
              className="h-10"
            >
              {updateUserMutation.isPending ? (
                <span className="flex items-center gap-2">
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
