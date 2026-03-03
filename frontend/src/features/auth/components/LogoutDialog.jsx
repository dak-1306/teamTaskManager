import ConfirmDialog from "../../../shared/ui/ConfirmDialog";
import { useAuth } from "../hooks/useAuth";

function LogoutDialog({ isOpen, onClose }) {
  const { logout } = useAuth();
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => {
        logout();
        onClose();
      }}
      title="Logout"
      message="Are you sure you want to logout?"
    />
  );
}
export default LogoutDialog;
