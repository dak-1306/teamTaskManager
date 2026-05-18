import ProfileInfo from "./profileInfo";
import ProfileSetting from "./ProfileSetting";
import ProfileAccount from "./ProfileAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserRound, KeyRound, Settings } from "lucide-react";

function Profile() {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">
              {" "}
              <UserRound className="w-4 h-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="account">
              {" "}
              <KeyRound className="w-4 h-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger value="setting">
              {" "}
              <Settings className="w-4 h-4 mr-2" /> Settings
            </TabsTrigger>
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
