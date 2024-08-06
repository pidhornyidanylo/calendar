"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as "light" | "dark" | null;
    if (savedMode) {
      setMode(savedMode);
      document.documentElement.classList.toggle(
        "dark-mode",
        savedMode === "dark"
      );
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", mode === "dark");
    const updateMode = (event: StorageEvent) => {
      if (event.key === "mode") {
        setMode((event.newValue as "light" | "dark") || "light");
      }
    };

    window.addEventListener("storage", updateMode);

    return () => {
      window.removeEventListener("storage", updateMode);
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
