import { Metadata } from "next";

export const metadata: Metadata = {
  title: "auth",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default AuthLayout;
