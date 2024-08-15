import SwitchTheme from "@/components/SettingsComponents/modeSelect/switchTheme/SwitchTheme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "auth",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
      <div style={{ position: "absolute", top: "10px", right: "30px" }}>
        <SwitchTheme local={true} />
      </div>
    </div>
  );
};

export default AuthLayout;
