import { ConfirmDialog } from '@/shared/ui/confirm-dialog';
import { useDeleteProfile } from '../model/use-delete-profile';

export const DeleteProfile = () => {
  const { deleteProfileMutation } = useDeleteProfile();

  return (
    <div className="mt-5 border p-2 rounded-md">
      <h2 className="font-semibold">Видалити акаунт</h2>

      <div className="flex mt-2 gap-2 ">
        <ConfirmDialog
          title="Ви впевненні, що хочете видалити акаунт?"
          onConfirm={() => deleteProfileMutation.mutate()}
          disabled={deleteProfileMutation.isPending}
          buttonText={'Видалити'}
        />
      </div>
    </div>
  );
};
