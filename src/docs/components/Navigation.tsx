import * as React from "react";
import { Card } from "../../components/card/Card";
import { Search } from "./Search";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { id: "getting-started", label: "Installation & Usage" },
      ],
    },
    {
      title: "Layout",
      items: [
        { id: "container", label: "Container" },
      ],
    },
    {
      title: "Forms",
      items: [
        { id: "input", label: "Input" },
        { id: "select", label: "Select" },
        { id: "checkbox", label: "Checkbox" },
        { id: "form-field", label: "Form Field" },
      ],
    },
    {
      title: "Components",
      items: [
        { id: "button", label: "Button" },
        { id: "card", label: "Card" },
        { id: "dialog", label: "Dialog" },
        { id: "dropdown", label: "Dropdown" },
        { id: "table", label: "Table" },
        { id: "tooltip", label: "Tooltip" },
      ],
    },
    {
      title: "Feedback",
      items: [
        { id: "toast", label: "Toast" },
        { id: "skeleton", label: "Skeleton" },
        { id: "error-state", label: "Error State" },
      ],
    },
    {
      title: "Typography",
      items: [
        { id: "title", label: "Title" },
        { id: "label", label: "Label" },
        { id: "code", label: "Code" },
      ],
    },
    {
      title: "Navigation",
      items: [
        { id: "header", label: "Header" },
        { id: "nav-menu", label: "Nav Menu" },
        { id: "breadcrumb", label: "Breadcrumb" },
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filterItems = (items: Array<{ id: string; label: string }>) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Card className="sticky top-8">
      <Card.Content className="p-4 space-y-4">
        <Search onSearch={setSearchQuery} />
        <nav className="space-y-8">
          {sections.map((section) => {
            const filteredItems = filterItems(section.items);
            if (filteredItems.length === 0) return null;
            
            return (
              <div key={section.title}>
                <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-1">
                  {filteredItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`text-sm w-full text-left px-2 py-1.5 rounded transition-colors ${
                          currentPage === item.id
                            ? "bg-gray-800 text-gray-100"
                            : "text-gray-400 hover:text-gray-100"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
      </Card.Content>
    </Card>
  );
}; 