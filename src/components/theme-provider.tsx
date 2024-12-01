// src/components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setThemeMode, type Theme } from '@/store/slices/themeSlice';
import { useSystemTheme } from '@/hooks/useSystemTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const systemTheme = useSystemTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    dispatch(setThemeMode(savedTheme || defaultTheme));
  }, [dispatch, defaultTheme]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const effectiveTheme = mode === 'system' ? systemTheme : mode;
    root.classList.add(effectiveTheme);
  }, [mode, systemTheme, mounted]);

  const value = {
    theme: mode,
    setTheme: (theme: Theme) => {
      dispatch(setThemeMode(theme));
      localStorage.setItem('theme', theme);
    },
  };

  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};