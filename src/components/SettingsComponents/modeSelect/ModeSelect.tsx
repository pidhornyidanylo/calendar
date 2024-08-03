"use client";
import React, { useState } from "react";
import styles from "./ModeSelect.module.css";

const ModeSelect = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <>
      <h3>Enable Dark Mode</h3>
      <p>Switch between light and dark themes.</p>
      <button
        className={`${styles.settingsButton} ${
          isDarkMode ? styles.active : ""
        }`}
        onClick={handleDarkModeToggle}
      >
        {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>
    </>
  );
};

export default ModeSelect;
