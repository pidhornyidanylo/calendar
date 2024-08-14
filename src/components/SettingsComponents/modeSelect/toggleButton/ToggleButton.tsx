"use client";
import React, { useState } from "react";
import styles from "./ToggleButton.module.css";
import { updateTheme } from "@/lib/actions";
import toast from "react-hot-toast";

const ToggleButton: React.FC = () => {
  const [mode, setMode] = useState("light");

  const handleDarkModeToggle = async () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    const response = await updateTheme(newMode);
    if (response.success) {
      toast.success(`Theme changed to ${newMode} successfully!`);
    } else {
      toast.error(response.message as string);
    }
  };
  return (
    <button
      className={`${styles.settingsButton} ${
        mode === "dark" ? styles.active : ""
      }`}
      onClick={handleDarkModeToggle}
    >
      {mode === "dark" ? "Disable Dark Mode" : "Enable Dark Mode"}
    </button>
  );
};

export default ToggleButton;
