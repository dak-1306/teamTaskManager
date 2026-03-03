import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import LogoutDialog from "../components/LogoutDialog";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { userProfile } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();
  console.log("User Profile:", userProfile);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10">
        {userProfile ? (
          <Card>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="mb-4">Name: {userProfile.username}</p>
            <p className="mb-4">Email: {userProfile.email}</p>
            <Button variant="primary">Edit Profile</Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => setOpenLogoutDialog(true)}
            >
              Logout
            </Button>
          </Card>
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
        <LogoutDialog
          isOpen={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
        />
      )}
    </MainLayout>
  );
}
export default Profile;
