"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface ConfirmPopupProps {
  children: React.ReactNode;
  title?: string;
  alertTitle?: string;
  description?: string;
  icon?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;       
  onConfirm?: () => void;
}

export default function ConfirmPopup({
  children,
  title = "Are you sure you want to delete this category?",
  alertTitle = "Warning",
  description = "This action cannot be undone.",
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-destructive hover:bg-destructive/80",
  onConfirm = () => {},
}: ConfirmPopupProps) {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            <Alert className="bg-destructive/10 text-destructive border-none">
              <AlertTitle>{alertTitle}</AlertTitle>
              <AlertDescription className="text-destructive/80">
                {description}
              </AlertDescription>
            </Alert>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className={confirmColor}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
