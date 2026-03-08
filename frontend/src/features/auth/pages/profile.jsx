import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import { User, Mail, Pencil, SquareArrowRightExit } from "lucide-react";

import AuthDialog from "../components/AuthDialog";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { userProfile, deleteUserProvider, logout } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const navigate = useNavigate();

  console.log("User Profile:", userProfile);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10">
        {userProfile ? (
          <div className="space-y-6">
            <Card className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">User Profile</h2>
              <p>
                <User className="inline mr-2" /> {userProfile.username}
              </p>
              <p>
                <Mail className="inline mr-2" /> {userProfile.email}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setOpenEditProfile(true)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => setOpenLogoutDialog(true)}
                >
                  <SquareArrowRightExit />
                </Button>
              </div>
            </Card>
            <Card className="space-x-4">
              <Button
                variant="secondary"
                onClick={() => setOpenChangePassword(true)}
                size="small"
              >
                Change password
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => setOpenDeleteAccountDialog(true)}
              >
                Delete Account
              </Button>
            </Card>
          </div>
        ) : (
          <Card>
            <h2 className="text-2xl font-bold mb-4">No User Profile Found</h2>
            <p className="mb-4">Please log in to view your profile.</p>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </Card>
        )}
      </div>
      {openLogoutDialog && (
        <AuthDialog
          isOpen={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          title="Logout"
          message="Are you sure you want to logout?"
          onConfirm={logout}
        />
      )}

      {openEditProfile && (
        <EditProfile
          user={userProfile}
          isOpen={openEditProfile}
          onClose={() => setOpenEditProfile(false)}
        />
      )}
      {openChangePassword && (
        <ChangePassword
          isOpen={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
          userId={userProfile._id}
        />
      )}
      {openDeleteAccountDialog && (
        <AuthDialog
          isOpen={openDeleteAccountDialog}
          onClose={() => setOpenDeleteAccountDialog(false)}
          title="Delete Account"
          message="Are you sure you want to delete your account?"
          onConfirm={() => deleteUserProvider(userProfile._id)}
        />
      )}
    </MainLayout>
  );
}
export default Profile;
