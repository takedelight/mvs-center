import { useAuth } from '@/core/auth';
import { Button } from '@/shared/ui';

import { LogOut as LogOutIcon } from 'lucide-react';

export const LogOut = () => {
  const {
    actions: { logout },
  } = useAuth();

  return (
    <Button
      onClick={logout}
      variant="ghost"
      className="mt-auto w-full justify-start gap-2 rounded-none p-4 text-lg text-red-500 hover:bg-red-50 hover:text-red-600"
    >
      <LogOutIcon size={20} />
      Вийти
    </Button>
  );
};
