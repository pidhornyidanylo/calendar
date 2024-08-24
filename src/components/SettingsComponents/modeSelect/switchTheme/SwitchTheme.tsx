"use client";
import { updateTheme } from "@/lib/actions";
import { getTheme } from "@/lib/data";
import Switch from "@mui/joy/Switch";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moon from "../../../../../public/icons/settings/moon.svg";
import sun from "../../../../../public/icons/settings/sun.svg";
import styles from "./SwitchTheme.module.css";

type SwitchThemePropType = {
  token: string;
};

const SwitchTheme: React.FC<SwitchThemePropType> = ({
  token,
}: {
  token: string;
}) => {
  const [currentMode, setCurrentMode] = useState<"light" | "dark">();

  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const response = await getTheme(token);
        const theme = response.theme as "light" | "dark";
        setCurrentMode(theme);

        if (theme === "dark") {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.remove("dark-mode");
        }
      } catch (error) {
        console.error("Failed to fetch the current theme:", error);
      }
    };

    if (token) {
      fetchCurrentTheme();
    }
  }, [token]);

  const handleDarkModeToggleFromDB = async () => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    const response = await updateTheme({
      theme: newMode,
      token: token,
    });

    if (response.success) {
      setCurrentMode(newMode);
      document.documentElement.classList.toggle(
        "dark-mode",
        newMode === "dark"
      );
      toast.success(`Theme changed to ${newMode} successfully!`);
    } else {
      toast.error(response.message as string);
    }
  };

  return (
    <Switch
      className={styles.switch}
      color="neutral"
      checked={currentMode === "dark"}
      onChange={handleDarkModeToggleFromDB}
      size="lg"
      sx={{
        "--Switch-thumbSize": "25px",
        "--Switch-trackRadius": "17px",
        "--Switch-trackWidth": "80px",
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
