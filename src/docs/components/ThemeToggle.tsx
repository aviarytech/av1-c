import * as React from "react";
import { Button } from "../../components/button/Button";
import { Sun, Moon, Monitor, Palette, Droplet } from "lucide-react";
import { useTheme, Theme, availableThemes } from "../../ThemeProvider";
import { Dropdown } from "../../components/dropdown/Dropdown";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const getThemeIcon = (currentTheme: Theme) => {
    switch(currentTheme) {
      case 'light': 
        return <Sun className="h-5 w-5" />;
      case 'dark': 
        return <Moon className="h-5 w-5" />;
      case 'system': 
        return <Monitor className="h-5 w-5" />;
      default: 
        return <Palette className="h-5 w-5" />;
    }
  };

  // For color indicator in theme menu
  const getThemeColor = (themeOption: Theme) => {
    switch(themeOption) {
      case 'blue': return 'bg-blue-primary';
      case 'green': return 'bg-green-primary';
      case 'purple': return 'bg-purple-primary';
      case 'amber': return 'bg-amber-primary';
      case 'light': return 'bg-gray-200';
      case 'dark': return 'bg-gray-800';
      case 'system': return 'bg-gradient-to-r from-gray-200 to-gray-800';
      default: return '';
    }
  };

  const getThemeLabel = (themeOption: Theme) => {
    // Capitalize first letter
    return themeOption.charAt(0).toUpperCase() + themeOption.slice(1);
  };

  return (
    <Dropdown
      trigger={
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto flex items-center gap-1"
          title={`Current theme: ${theme}`}
        >
          {getThemeIcon(theme)}
        </Button>
      }
      align="end"
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      className="fixed mt-2 right-4 top-12 w-56"
    >
      <div className="p-2 w-48">
        <div className="mb-2 text-sm font-medium">Select theme</div>
        <div className="grid grid-cols-2 gap-2">
          {availableThemes.map((themeOption) => (
            <Button
              key={themeOption}
              variant={theme === themeOption ? "default" : "outline"}
              size="sm"
              className="flex items-center justify-start gap-2"
              onClick={() => {
                setTheme(themeOption);
                setDropdownOpen(false);
              }}
            >
              <span className={`w-3 h-3 rounded-full ${getThemeColor(themeOption)}`} />
              <span>{getThemeLabel(themeOption)}</span>
            </Button>
          ))}
        </div>
      </div>
    </Dropdown>
  );
}; 