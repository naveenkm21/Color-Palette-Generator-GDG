import React from 'react';
import ColorSwatch from './ColorSwatch';
import { Color } from '../types';
import { getColorName } from '../utils/colorUtils';

interface PaletteDisplayProps {
  colors: string[];
  type: string;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ colors, type }) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4">
        {colors.map((color, index) => (
          <ColorSwatch 
            key={index} 
            color={color} 
            name={getColorName(index, type)}
            size="lg"
          />
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;