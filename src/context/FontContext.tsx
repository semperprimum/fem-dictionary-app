import { createContext, useContext, useState } from "react";

interface FontContextProps {
  children: React.ReactNode;
}

type Font = "serif" | "sans" | "mono";

interface FontContextType {
  currentFont: Font;
  changeFont: (newFont: Font) => void;
}

export const FontContext = createContext<FontContextType | null>(null);

export const useFont = () => {
  return useContext(FontContext);
};

const FontContextProvider: React.FC<FontContextProps> = ({ children }) => {
  const [currentFont, setCurrentFont] = useState<Font>((): Font => {
    // Try to get font from localStorage
    const savedFont = window.localStorage.getItem("font");
    if (savedFont) {
      return savedFont as Font;
    }

    // Default to 'serif'
    return "serif";
  });

  const setFont = (newFont: Font): void => {
    setCurrentFont(() => {
      window.localStorage.setItem("font", newFont);
      return newFont;
    });
  };

  return (
    <FontContext.Provider value={{ currentFont, changeFont: setFont }}>
      {children}
    </FontContext.Provider>
  );
};

export default FontContextProvider;
