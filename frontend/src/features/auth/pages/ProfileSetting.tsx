import { Card } from "@/components/ui/card";

import { useTheme } from "../../../context/ThemContext";
import { Switch } from "@/components/ui/switch";
export default function ProfileSetting() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Card className="space-x-2 flex flex-row p-6">
      <p> You can switch between light and dark themes.</p>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <p>{theme === "dark" ? "Dark" : "Light"}</p>
    </Card>
  );
}
