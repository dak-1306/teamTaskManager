import { AuthProvider } from "../features/auth/context/AuthProvider";
import { ThemeProvider } from "../shared/context/ThemeProvider";
export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
