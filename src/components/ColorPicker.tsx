import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { generateRandomColor } from '../utils/colorUtils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const generateRandom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const randomColor = generateRandomColor();
    onChange(randomColor);
  };
  
  return (
    <div className="relative" ref={pickerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex">
        <div 
          className="h-10 w-10 rounded-l-md border border-gray-300 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => setShowPicker(!showPicker)}
        />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-l-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        
        <button
          type="button"
          onClick={generateRandom}
          className="flex items-center justify-center w-10 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors"
          title="Generate random color"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      
      {showPicker && (
        <div className="absolute z-10 mt-1 p-2 bg-white rounded-md shadow-lg border border-gray-200">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-32 w-32 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;