import * as React from "react";

export type ColorTheme = 'blue' | 'green' | 'purple' | 'amber';
export type BaseTheme = 'light' | 'dark' | 'system';
export type Theme = BaseTheme | ColorTheme;

type ThemeContextType = {
  theme: Theme;
  colorTheme: ColorTheme | null;
  baseTheme: BaseTheme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
};

export const availableThemes: Theme[] = ['light', 'dark', 'system', 'blue', 'green', 'purple', 'amber'];

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const COLOR_THEMES: ColorTheme[] = ['blue', 'green', 'purple', 'amber'];
const BASE_THEMES: BaseTheme[] = ['light', 'dark', 'system'];

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'system' 
}) => {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return (localStorage.getItem('theme') as Theme) || defaultTheme;
  });
  
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return BASE_THEMES.includes(theme as BaseTheme) ? (theme as 'light' | 'dark') : 'light';
  });

  const baseTheme = React.useMemo<BaseTheme>(() => {
    if (BASE_THEMES.includes(theme as BaseTheme)) {
      return theme as BaseTheme;
    }
    return 'light';
  }, [theme]);

  const colorTheme = React.useMemo<ColorTheme | null>(() => {
    if (COLOR_THEMES.includes(theme as ColorTheme)) {
      return theme as ColorTheme;
    }
    return null;
  }, [theme]);

  // Handle system preference changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(newTheme);
        updateDocumentClass(newTheme, colorTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, colorTheme]);

  // Update the DOM and resolved theme when theme changes
  React.useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
      updateDocumentClass(systemTheme, colorTheme);
    } else if (BASE_THEMES.includes(theme as BaseTheme)) {
      setResolvedTheme(theme as 'light' | 'dark');
      updateDocumentClass(theme as 'light' | 'dark', colorTheme);
    } else {
      // For color themes, we apply both the base theme (light) and the color theme
      updateDocumentClass('light', theme as ColorTheme);
    }
  }, [theme, colorTheme]);

  const updateDocumentClass = (baseTheme: 'light' | 'dark', colorTheme: ColorTheme | null) => {
    // Handle dark/light mode
    if (baseTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Remove any existing color theme classes
    COLOR_THEMES.forEach(ct => {
      document.documentElement.classList.remove(`theme-${ct}`);
    });

    // Apply color theme if present
    if (colorTheme) {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      colorTheme, 
      baseTheme, 
      resolvedTheme, 
      setTheme, 
      availableThemes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};