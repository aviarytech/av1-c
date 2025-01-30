import * as React from "react";
import { Dialog, DialogHeader, DialogContent } from "./Dialog";
import { Search } from "lucide-react";
import { Input } from "../input/Input";

export interface SelectOption {
  id: string;
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface SelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  options: SelectOption[];
  onSelect: (option: SelectOption) => void;
  searchPlaceholder?: string;
  className?: string;
}

export const SelectModal: React.FC<SelectModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  options,
  onSelect,
  searchPlaceholder = "Search...",
  className,
}) => {
  const [search, setSearch] = React.useState("");
  const filteredOptions = options.filter(
    option => 
      option.title.toLowerCase().includes(search.toLowerCase()) ||
      option.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onClose={onClose} className={className}>
      <DialogHeader>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </DialogHeader>
      <DialogContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {filteredOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors"
            >
              <h3 className="font-medium">{option.title}</h3>
              {option.description && (
                <p className="text-sm text-gray-400 mt-1">{option.description}</p>
              )}
            </button>
          ))}
          {filteredOptions.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No results found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}; 