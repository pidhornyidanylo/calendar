"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { updateTheme } from "@/lib/actions";
import toast from "react-hot-toast";
import { getTheme } from "@/lib/data";
import Switch from "@mui/joy/Switch";
import sun from "../../../../../public/icons/settings/sun.svg";
import moon from "../../../../../public/icons/settings/moon.svg";
import styles from "./SwitchTheme.module.css";

type SwitchThemeProps = {
  local: boolean;
};

const SwitchTheme: React.FC<SwitchThemeProps> = ({ local }) => {
  const [currentMode, setCurrentMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!local) {
      const fetchCurrentTheme = async () => {
        try {
          const response = await getTheme();
          const { theme } = await response.json();
          setCurrentMode(theme);
          document.documentElement.classList.toggle("dark-mode", theme === "dark");
        } catch (error) {
          console.error("Failed to fetch the current theme:", error);
        }
      };

      fetchCurrentTheme();
    } else {
      setCurrentMode(document.documentElement.classList.contains("dark-mode") ? "dark" : "light");
    }
  }, [local]);

  const handleDarkModeToggleFromDB = async () => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    const response = await updateTheme(newMode);

    if (response.success) {
      setCurrentMode(newMode);
      document.documentElement.classList.toggle("dark-mode", newMode === "dark");
      toast.success(`Theme changed to ${newMode} successfully!`);
    } else {
      toast.error(response.message as string);
    }
  };

  const handleLocalDarkModeToggle = () => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    setCurrentMode(newMode);
    document.documentElement.classList.toggle("dark-mode", newMode === "dark");
  };

  return (
    <Switch
      className={styles.switch}
      color="neutral"
      checked={currentMode === "dark"}
      onChange={local ? handleLocalDarkModeToggle : handleDarkModeToggleFromDB}
      size="lg"
      sx={{
        "--Switch-thumbSize": "25px",
        "--Switch-trackRadius": "17px",
        "--Switch-trackWidth": "70px",
        "--Switch-trackHeight": "35px",
        "--Switch-thumbOffset": "4px",
        position: "relative",
      }}
      startDecorator={
        currentMode === "light" ? (
          <Image
            style={{
              position: "absolute",
              right: "5px",
              top: "5px",
              zIndex: 2,
            }}
            src={sun}
            alt={"sun"}
          />
        ) : (
          <Image
            style={{
              position: "absolute",
              left: "17px",
              top: "5px",
              zIndex: 2,
            }}
            src={moon}
            alt={"moon"}
          />
        )
      }
    />
  );
};

export default SwitchTheme;
