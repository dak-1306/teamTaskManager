import { ReactNode } from "react";
import { ThemeProvider } from "../context/ThemContext";

export function Providers({ children }: { children?: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
