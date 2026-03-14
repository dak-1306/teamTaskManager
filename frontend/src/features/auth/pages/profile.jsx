import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import { User, Mail, Pencil, SquareArrowRightExit } from "lucide-react";

import AuthDialog from "../components/AuthDialog";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useTheme } from "../../../shared/context/useTheme";

function Profile() {
  const { userProfile, deleteUserProvider, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const navigate = useNavigate();

  console.log("User Profile:", userProfile);

  return (
    <MainLayout isLogin={userProfile ? true : false}>
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
                  icon={<Pencil className="w-4 h-4 mr-2" />}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  icon={<SquareArrowRightExit className="w-4 h-4 mr-2" />}
                  onClick={() => setOpenLogoutDialog(true)}
                >
                  Logout
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
            <Card className="flex items-center space-x-4">
              <p>Theme:</p>
              <label className="flex items-center space-x-2 w-10 h-6 bg-gray-100 p-1 rounded-full border border-gray-300 cursor-pointer">
                <input
                  className="hidden"
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                {theme === "dark" ? (
                  <span className="w-4 h-4 bg-gray-800 rounded-full transform translate-x-4"></span>
                ) : (
                  <span className="w-4 h-4 bg-blue-500 rounded-full "></span>
                )}
              </label>
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
