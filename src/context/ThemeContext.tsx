"use client";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

interface ThemeContextType {
  mode: string;
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
  const mode = localStorage.getItem("mode") as string;
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", mode === "dark");
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
