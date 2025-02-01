import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Context } from '../../types/schema';
import { Input } from '../input/Input';
import { Button } from '../button/Button';

interface ContextChipInputProps {
  /** Array of contexts to display */
  contexts: Context[];
  /** Callback when contexts are updated */
  onChange: (contexts: Context[]) => void;
}

/**
 * Input component for managing JSON-LD context URIs with chip-style display
 */
export function ContextChipInput({ contexts, onChange }: ContextChipInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!input.trim()) return;

    // Basic URL validation
    if (!/^(https?:\/\/|\.\/|\.\.\/|\/)/.test(input)) {
      setError('Invalid context URI format');
      return;
    }

    const newContexts = [...contexts, { uri: input.trim() }];
    onChange(newContexts);
    setInput('');
    setError(null);
  };

  const handleRemove = (index: number) => {
    // Don't allow removing the W3C base context
    if (index === 0) return;
    
    const newContexts = contexts.filter((_, i) => i !== index);
    onChange(newContexts);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {contexts.map((context, index) => (
          <div 
            key={context.uri}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`
              flex items-center gap-2 px-3 py-1 rounded-full text-sm cursor-help
              ${index === 0 
                ? 'bg-blue-900 text-blue-100' // Base context
                : 'bg-gray-700 text-gray-100'
              }
            `}>
              <span>{context.prefix || context.uri}</span>
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="hover:text-red-300 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {hoveredIndex === index && (
              <div className="absolute left-0 bottom-full mb-2 z-50">
                <div className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs whitespace-nowrap">
                  <div>{context.uri}</div>
                  {context.description && (
                    <div className="text-gray-400">{context.description}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add context URI..."
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAdd}
          variant="default"
          size="sm"
        >
          Add
        </Button>
      </div>
      
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
} 