import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  //  等价于 return <AuthProvider children={children} />;
  return <AuthProvider>{children}</AuthProvider>;
};
