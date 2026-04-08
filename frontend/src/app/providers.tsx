import { ReactNode } from "react";
import { AuthProvider } from "../features/auth/context/AuthContext";
import { ThemeProvider } from "../context/ThemeProvider";

export function Providers({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
