import type React from "react";
import SwitchTheme from "./switchTheme/SwitchTheme";

type ModeSelectPropType = {
  token: string;
};

const ModeSelect: React.FC<ModeSelectPropType> = ({
  token,
}: {
  token: string;
}) => {
  return (
    <>
      <h3>Enable Dark Mode</h3>
      <p>Switch between light and dark themes.</p>
      <SwitchTheme token={token} />
    </>
  );
};

export default ModeSelect;
