import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import LogoutDialog from "../components/LogoutDialog";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import useTaskStore from "../../task/stores/taskStore";

function Profile() {
  const { userProfile } = useAuth();
  const { tasks, fetchTasks } = useTaskStore();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      fetchTasks();
    }
  }, [userProfile, fetchTasks]);

  console.log("User Profile:", userProfile);
  console.log("User Tasks:", tasks);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10 space-y-6">
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
        {tasks && tasks.length > 0 && (
          <Card>
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task._id} className="mb-2">
                  {task.title}
                  <span className="text-sm text-gray-500 ml-2">
                    (Due: {new Date(task.dueDate).toLocaleDateString()})
                  </span>
                  <Button
                    variant="link"
                    className="ml-4"
                    onClick={() => navigate(`/projects/${task.project._id}/member`)}
                  >
                    View Details
                  </Button>
                </li>
              ))}
            </ul>
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
