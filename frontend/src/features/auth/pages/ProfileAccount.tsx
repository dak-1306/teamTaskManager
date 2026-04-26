import { SquareArrowRightExit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import AuthDialog from "../components/AuthDialog";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
export default function ProfileAccount() {
  const { userProfile, deleteUserProvider, loading, logout } = useAuth() as any;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <p>Logout</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <SquareArrowRightExit className="w-4 h-4 mr-2" /> Logout
              </Button>
            </AlertDialogTrigger>
            <AuthDialog
              title="Logout"
              message="Are you sure you want to logout?"
              onConfirm={handleLogout}
            />
          </AlertDialog>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <p>Delete your account permanently.</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AuthDialog
              title="Delete Account"
              message="Are you sure you want to delete your account?"
              onConfirm={() => deleteUserProvider(userProfile._id)}
            />
          </AlertDialog>
        </div>
        <Separator />
        <ChangePassword userId={userProfile._id} />
      </div>
    </>
  );
}
