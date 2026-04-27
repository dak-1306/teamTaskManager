import MainLayout from "../../../components/layout/MainLayout";
import { motion as Motion } from "framer-motion";
import { container, item, inViewOptions } from "../../../app/motionConfig";
import ProfileInfo from "./profileInfo";
import ProfileSetting from "./ProfileSetting";
import ProfileAccount from "./ProfileAccount";

import SkeletonProfile from "./SkeletonProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Profile() {
  return (
    <>
      <div className="max-w-2xl mx-auto mt-10">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="setting">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileInfo />
          </TabsContent>
          <TabsContent value="account">
            <ProfileAccount />
          </TabsContent>
          <TabsContent value="setting">
            <ProfileSetting />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Profile;
