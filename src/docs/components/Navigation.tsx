import * as React from "react";
import { Card } from "../../components/card/Card";
import { Search } from "./Search";
import { Accordion } from "../../components/accordion/Accordion";
import { cn } from "../../utils/cn";

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
        { id: "accordion", label: "Accordion" },
        { id: "code-editor", label: "Code Editor" },
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

  const renderSection = (section: typeof sections[0]) => {
    const filteredItems = filterItems(section.items);
    if (filteredItems.length === 0) return null;

    return (
      <ul className="space-y-1 py-1">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={cn(
                "text-sm w-full text-left px-3 py-1.5 rounded-md transition-all duration-200",
                currentPage === item.id
                  ? "bg-blue-500/10 text-blue-400 font-medium"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const accordionItems = sections
    .map(section => ({
      title: section.title,
      content: renderSection(section),
      defaultOpen: false
    }))
    .filter(item => item.content !== null);

  return (
    <Card className="sticky top-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
      <Card.Content className="p-4 space-y-6">
        <Search onSearch={setSearchQuery} />
        <Accordion items={accordionItems} />
      </Card.Content>
    </Card>
  );
}; 