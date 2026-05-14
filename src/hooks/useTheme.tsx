import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ColorTheme = 'blue' | 'pink' | 'purple' | 'green';

interface ThemeContextType {
  mode: Theme;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => (localStorage.getItem('colorTheme') as ColorTheme) || 'blue');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-color-theme', colorTheme);
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  const setColorTheme = (theme: ColorTheme) => setColorThemeState(theme);

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, toggleMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
