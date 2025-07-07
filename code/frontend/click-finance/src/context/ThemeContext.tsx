import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';
type ThemeCtx = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const sys = Appearance.getColorScheme() ?? 'light';
  const [theme, setTheme] = useState<Theme>(sys);

  function toggle() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};
