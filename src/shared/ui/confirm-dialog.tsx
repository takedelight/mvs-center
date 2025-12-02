import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from '@/shared/ui';
import { useEffect, useState } from 'react';

interface Props {
  title: string;
  className?: string;
  onConfirm: () => void;
  buttonText: string;
  disabled?: boolean;
}

export const ConfirmDialog = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setCounter(3);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || counter <= 0) return;

    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, counter]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">{props.buttonText}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>

        <div className="flex justify-end items-center gap-1">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Відмінити
          </Button>

          <Button
            onClick={() => {
              props.onConfirm();
              setOpen(false);
            }}
            disabled={counter > 0 || props.disabled}
            variant="destructive"
          >
            <span className="flex items-center">
              {props.disabled ? (
                <>
                  <Spinner />
                  {props.buttonText}
                </>
              ) : (
                props.buttonText
              )}

              {counter > 0 && <span className="ml-1">{counter}</span>}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

