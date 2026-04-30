import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../../../components/ui/card";
import { useState, useRef } from "react";
import { User, Mail, Pencil, Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditProfile from "../components/EditProfile";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "../../../components/ui/skeleton";
export default function ProfileInfo() {
  const { userProfile, loading, uploadAvatarProvider, deleteAvatarProvider } =
    useAuth() as any;

  const [openEditProfile, setOpenEditProfile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChooseAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setUploadProgress(0);

      await uploadAvatarProvider(userProfile._id, file, (percent: number) => {
        setUploadProgress(percent);
      });

      setToast({ type: "success", message: "Avatar uploaded" });
      setTimeout(() => setToast(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Avatar upload failed:", msg);
      setToast({ type: "error", message: msg || "Upload failed" });
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setToast({ type: "error", message: msg || "Delete failed" });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsProcessing(false);
    }
  };
  const renderSkeleton = () => (
    <Card className="space-y-4 p-6">
      <CardHeader>
        <Skeleton className="h-6 w-1/4 rounded bg-muted dark:bg-muted" />
        <Skeleton className="h-4 w-1/2 rounded bg-muted dark:bg-muted" />
      </CardHeader>
      <CardContent className="flex items-center space-x-8">
        <Skeleton className="w-40 h-40 rounded-full bg-muted dark:bg-muted" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-1/3 rounded bg-muted dark:bg-muted" />
          <Skeleton className="h-6 w-1/3 rounded bg-muted dark:bg-muted" />
        </div>
      </CardContent>
    </Card>
  );

  if (loading || !userProfile) {
    return renderSkeleton();
  }
  return (
    <>
      <Card className="space-y-4 p-6">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>
            Manage your profile information and preferences.
          </CardDescription>
          <CardAction>
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setOpenEditProfile(true)}
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="flex items-center space-x-8">
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
              <User className="inline mr-2" />{" "}
              {userProfile.username || "No username"}
            </p>
            <p>
              <Mail className="inline mr-2" /> {userProfile.email || "No email"}
            </p>
          </div>
        </CardContent>
      </Card>
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
      {openEditProfile && (
        <EditProfile
          user={userProfile}
          isOpen={openEditProfile}
          onClose={() => setOpenEditProfile(false)}
        />
      )}
    </>
  );
}
