import { AuthProvider } from "../features/auth/context/AuthProvider";
export function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
