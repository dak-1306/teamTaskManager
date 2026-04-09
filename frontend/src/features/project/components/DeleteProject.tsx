// @ts-nocheck
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../../../components/ui/alert-dialog";
import useProjectStore from "../stores/projectStore";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName?: string;
}

function DeleteProject({ isOpen, onClose, projectId, projectName }: Props) {
  const { deleteProject } = useProjectStore();
  const navigate = useNavigate();
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Project {projectName}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </AlertDialogDescription>
        <div className="flex space-x-4 justify-center mt-4">
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteProject(projectId);
              onClose();
              navigate(-1);
            }}
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProject;
