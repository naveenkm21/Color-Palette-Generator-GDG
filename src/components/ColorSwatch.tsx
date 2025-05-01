import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getTextColor } from '../utils/colorUtils';

interface ColorSwatchProps {
  color: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  name, 
  size = 'md' 
}) => {
  const [copied, setCopied] = useState(false);
  const textColor = getTextColor(color);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };
  
  return (
    <div 
      className={`relative group ${sizeClasses[size]} rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer shadow-md`}
      onClick={copyToClipboard}
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity p-2">
        <div 
          className={`flex items-center justify-center ${textColor === 'white' ? 'text-white' : 'text-black'}`}
        >
          {copied ? (
            <Check size={18} className="animate-pulse" />
          ) : (
            <Copy size={18} />
          )}
        </div>
        <span 
          className={`text-xs font-medium mt-1 ${textColor === 'white' ? 'text-white' : 'text-black'}`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 p-2 bg-black/20 flex flex-col items-center transition-opacity`}
      >
        {name && (
          <span 
            className={`text-xs font-medium ${textColor === 'white' ? 'text-white' : 'text-black'}`}
          >
            {name}
          </span>
        )}
        <span 
          className={`text-xs font-bold ${textColor === 'white' ? 'text-white' : 'text-black'}`}
        >
          {color}
        </span>
      </div>
    </div>
  );
};

export default ColorSwatch;