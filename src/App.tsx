import React from 'react';
import { Palette } from 'lucide-react';
import ColorPicker from './components/ColorPicker';
import PaletteTypeSelector from './components/PaletteTypeSelector';
import PaletteDisplay from './components/PaletteDisplay';
import PaletteActions from './components/PaletteActions';
import SavedPalettes from './components/SavedPalettes';
import { usePalette } from './hooks/usePalette';

function App() {
  const {
    baseColor,
    setBaseColor,
    paletteType,
    setPaletteType,
    currentPalette,
    savedPalettes,
    savePalette,
    deletePalette,
    loadPalette,
    sharePalette,
    exportPalette
  } = usePalette();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Palette className="h-6 w-6 text-indigo-600 mr-2" />
          <h1 className="text-xl font-bold">Color Palette Generator</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="max-w-xl mx-auto">
            <p className="text-gray-600 text-center mb-8">
              Select a base color and palette type to generate your color scheme.
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Choose Your Base Color</h2>
              <ColorPicker 
                value={baseColor} 
                onChange={setBaseColor} 
              />
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Select Palette Type</h2>
              <div className="text-sm text-gray-600 mb-4">
                Choose from monochromatic, analogous, complementary, triadic, or tetradic color schemes.
              </div>
              <PaletteTypeSelector 
                value={paletteType} 
                onChange={setPaletteType} 
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-center">Generated Palette</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Click any color to copy its hex code
            </p>
            {currentPalette && (
              <PaletteDisplay 
                colors={currentPalette.colors.map(c => c.hex)} 
                type={paletteType} 
              />
            )}
          </div>

          <PaletteActions
            onSave={savePalette}
            onShare={() => {
              const url = sharePalette();
              if (url) {
                alert('Share URL copied to clipboard!');
              }
            }}
            onExport={exportPalette}
          />
        </div>

        <SavedPalettes
          palettes={savedPalettes}
          onSelect={loadPalette}
          onDelete={deletePalette}
        />
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Color Palette Generator — Create beautiful color palettes for your next project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;