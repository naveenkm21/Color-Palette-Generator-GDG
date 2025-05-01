import React from 'react';

interface PaletteTypeSelectorProps {
  value: string;
  onChange: (type: string) => void;
}

const paletteTypes = [
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'tetradic', label: 'Tetradic' }
];

const PaletteTypeSelector: React.FC<PaletteTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {paletteTypes.map((type) => (
        <button
          key={type.value}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            value === type.value
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onChange(type.value)}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default PaletteTypeSelector;