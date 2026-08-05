import type { ReactNode } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: ReactNode;
  onConfirm: () => void;
  isPending?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  title = 'Deseja excluir?',
  description = 'Esta ação não poderá ser desfeita.',
  onConfirm,
  isPending = false,
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="flex flex-col items-center text-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>

          <div className="space-y-1.5 text-center">
            <DialogTitle className="text-lg font-semibold text-foreground">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto h-10 px-4"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            className="w-full sm:w-auto h-10 px-4 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <span className="flex items-center gap-2">Excluindo...</span>
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 className="size-4" />
                {confirmText}
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
