import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface ColorContextProps {
  foreground: string;
  background: string;
  setForeground: (color: string) => void;
  setBackground: (color: string) => void;
}

export const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foreground, setForeground] = useState("#ffffff");
  const [background, setBackground] = useState("#000000");

  useEffect(() => {
    const storedForeground = localStorage.getItem('foreground');
    const storedBackground = localStorage.getItem('background');
    if (storedForeground) setForeground(storedForeground);
    if (storedBackground) setBackground(storedBackground);
  }, []);

  useEffect(() => {
    localStorage.setItem('foreground', foreground);
  }, [foreground]);

  useEffect(() => {
    localStorage.setItem('background', background);
  }, [background]);

  return (
    <ColorContext.Provider value={{ foreground, background, setForeground, setBackground }}>
      {children}
    </ColorContext.Provider>
  );
};
