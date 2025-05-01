import React from 'react';
import { SavedPalette } from '../types';
import { Trash2 } from 'lucide-react';

interface SavedPalettesProps {
  palettes: SavedPalette[];
  onSelect: (palette: SavedPalette) => void;
  onDelete: (id: string) => void;
}

const SavedPalettes: React.FC<SavedPalettesProps> = ({ 
  palettes, 
  onSelect, 
  onDelete 
}) => {
  if (palettes.length === 0) {
    return null;
  }
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="w-full mb-6">
      <h3 className="text-lg font-semibold mb-3">Saved Palettes</h3>
      <div className="flex flex-wrap gap-4">
        {palettes.map((palette) => (
          <div 
            key={palette.id} 
            className="relative group bg-white rounded-md shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            <div 
              className="w-full h-16 flex cursor-pointer"
              onClick={() => onSelect(palette)}
            >
              {palette.colors.map((color, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-full" 
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <div className="p-2 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {formatDate(palette.savedAt)}
              </div>
              <button
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(palette.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPalettes;