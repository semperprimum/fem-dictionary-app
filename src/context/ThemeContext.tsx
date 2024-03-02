import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../themes";

interface ThemeContextProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  currentTheme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeContextProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(() => {
    // Try to get theme from localStorage
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "light" ? "light" : "dark";
    }

    // If no theme in localStorage, try to get system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    // Default to 'dark'
    return "light";
  });

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme: toggleTheme }}>
      <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
