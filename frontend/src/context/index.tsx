import { PropsWithChildren } from "react";
import { AuthProvider } from "./authContext";

export function ContextProvider({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
