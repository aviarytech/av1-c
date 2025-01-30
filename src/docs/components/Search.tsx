import * as React from "react";
import { Input } from "../../components/input/Input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        className="pl-9"
        placeholder="Search components..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}; 