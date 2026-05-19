import { Card } from "@/components/ui/card";
import { Moon, SunMedium } from "lucide-react";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
export default function ProfileSetting() {
  const { theme, setTheme } = useTheme();
  return (
    <Card className="space-x-2 flex flex-row p-6">
      <p> You can switch between light and dark themes.</p>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <p>
        {theme === "dark" ? (
          <p className="flex items-center gap-1">
            <Moon className="w-4 h-4 text-blue-500" />
            Tối
          </p>
        ) : (
          <p className="flex items-center gap-1">
            <SunMedium className="w-4 h-4 text-yellow-500" />
            Sáng
          </p>
        )}
      </p>
    </Card>
  );
}
