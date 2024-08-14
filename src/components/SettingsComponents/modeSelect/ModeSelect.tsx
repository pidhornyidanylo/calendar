import React from "react";
import ToggleButton from "./toggleButton/ToggleButton";

const ModeSelect: React.FC = () => {
  return (
    <>
      <h3>Enable Dark Mode</h3>
      <p>Switch between light and dark themes.</p>
      <ToggleButton />
    </>
  );
};

export default ModeSelect;
