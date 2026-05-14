import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'neon-void' | 'frost' | 'cosmic' | 'ember';

interface ThemeContextType {
  mode: Theme;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => (localStorage.getItem('theme') as ColorTheme) || 'neon-void');

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', colorTheme);
    localStorage.setItem('theme', colorTheme);
  }, [colorTheme]);

  const toggleMode = () => {}; // No-op as requested theme structure takes over
  const setTheme = (theme: ColorTheme) => setColorThemeState(theme);

  return (
    <ThemeContext.Provider value={{ mode: 'dark', colorTheme, toggleMode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
