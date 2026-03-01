import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import { useAuth } from "../hooks/useAuth";

import { useEffect } from "react";

function Profile() {
  const { profile, userProfile } = useAuth();
  useEffect(() => {
    profile();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10">
        {userProfile && userProfile.length > 0 ? (
          <Card>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="mb-4">Name: {userProfile[0].username}</p>
            <p className="mb-4">Email: {userProfile[0].email}</p>
            <Button variant="primary">Edit Profile</Button>
          </Card>
        ) : (
          <Card>
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="mb-4">Name: John Doe</p>
            <p className="mb-4">Email: john.doe@example.com</p>
            <Button variant="primary">Edit Profile</Button>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
export default Profile;
