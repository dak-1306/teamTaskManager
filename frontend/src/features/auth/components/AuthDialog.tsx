import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import React from "react";

type AuthDialogProps = {
  title?: React.ReactNode;
  message?: React.ReactNode;
  onConfirm: () => void;
};

function AuthDialog({ title, message, onConfirm }: AuthDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title || "Confirm Action"}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription>
        {message || "Are you sure you want to proceed?"}
      </AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="outline">Cancel</Button>
        </AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}

export default AuthDialog;
