import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

import {
  User,
  Mail,
  Pencil,
  SquareArrowRightExit,
  Camera,
  Trash2,
} from "lucide-react";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import AuthDialog from "../components/AuthDialog";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import SkeletonProfile from "./SkeletonProfile";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { useTheme } from "../../../shared/context/useTheme";

function Profile() {
  const {
    userProfile,
    deleteUserProvider,
    loading,
    logout,
    uploadAvatarProvider,
    deleteAvatarProvider,
  } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fileInputRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const handleChooseAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setUploadProgress(0);

      await uploadAvatarProvider(userProfile._id, file, (percent) => {
        setUploadProgress(percent);
      });

      setToast({ type: "success", message: "Avatar uploaded" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Avatar upload failed:", err.message);
      setToast({ type: "error", message: err.message || "Upload failed" });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!confirm("Delete avatar?")) return;

    try {
      setIsProcessing(true);
      await deleteAvatarProvider(userProfile._id);
      setToast({ type: "success", message: "Avatar deleted" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Delete failed" });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10">
        {loading ? (
          <SkeletonProfile />
        ) : (
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
            className="space-y-6"
          >
            {/* PROFILE CARD */}
            <Motion.div variants={item}>
              <Card className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>

                <div className="flex items-center space-x-8">
                  {/* AVATAR */}
                  <div className="relative group w-40 h-40">
                    <div className="w-40 h-40 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                      {userProfile.avatar ? (
                        <img
                          src={userProfile.avatar}
                          alt="avatar"
                          className={`w-full h-full object-cover transition-opacity ${
                            isProcessing ? "opacity-40" : "opacity-100"
                          }`}
                        />
                      ) : (
                        <User className="w-20 h-20 text-gray-500" />
                      )}
                    </div>

                    {/* Hover overlay */}
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition rounded-full"
                      onClick={handleChooseAvatar}
                      disabled={isProcessing}
                    >
                      <Camera className="w-6 h-6" />
                    </button>

                    {/* Delete avatar */}
                    {userProfile.avatar && !isProcessing && (
                      <button
                        className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
                        onClick={handleDeleteAvatar}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Upload overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-white border-dashed rounded-full animate-spin"></div>
                          {uploadProgress > 0 && (
                            <span className="text-white text-xs mt-1">
                              {uploadProgress}%
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* USER INFO */}
                  <div className="flex-1 space-y-4">
                    <p>
                      <User className="inline mr-2" /> {userProfile.username}
                    </p>
                    <p>
                      <Mail className="inline mr-2" /> {userProfile.email}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="small"
                    icon={<Pencil className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenEditProfile(true)}
                  >
                    Edit Profile
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />

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
            </Motion.div>

            {/* OTHER SETTINGS */}
            <Motion.div variants={item}>
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
            </Motion.div>

            {/* THEME */}
            <Motion.div variants={item}>
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
                    <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                  )}
                </label>
              </Card>
            </Motion.div>
          </Motion.div>
        )}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`px-4 py-2 rounded-lg shadow-lg text-sm text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* DIALOGS */}
      {openLogoutDialog && (
        <AuthDialog
          isOpen={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          title="Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
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
