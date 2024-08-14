"use client";
import React, { useState, useEffect } from "react";
import styles from "./ToggleButton.module.css";
import { updateTheme } from "@/lib/actions";
import toast from "react-hot-toast";
import { getTheme } from "@/lib/data";

const ToggleButton: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const response = await getTheme();
        const { theme } = await response.json();
        setCurrentMode(theme);
      } catch (error) {
        console.error("Failed to fetch the current theme:", error);
      }
    };

    fetchCurrentTheme();
  }, []);

  const handleDarkModeToggle = async () => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    const response = await updateTheme(newMode);

    if (response.success) {
      setCurrentMode(newMode);
      toast.success(`Theme changed to ${newMode} successfully!`);
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <button
      className={`${styles.settingsButton} ${
        currentMode === "dark" ? styles.active : ""
      }`}
      onClick={handleDarkModeToggle}
    >
      {currentMode === "dark" ? "Disable Dark Mode" : "Enable Dark Mode"}
    </button>
  );
};

export default ToggleButton;
