import * as React from "react";
import { Button } from "../../components/button/Button";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../ThemeProvider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Cycle through theme options: light -> dark -> system -> light
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="ml-auto"
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5" />
      ) : theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Monitor className="h-5 w-5" />
      )}
    </Button>
  );
}; 