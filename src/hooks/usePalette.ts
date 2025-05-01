import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Palette, SavedPalette, Color, PaletteType } from '../types';
import { generatePalette } from '../utils/colorUtils';

// Add uuid to package.json
const STORAGE_KEY = 'color-palette-generator-saved';

export const usePalette = () => {
  const [baseColor, setBaseColor] = useState<string>('#3b82f6');
  const [paletteType, setPaletteType] = useState<PaletteType>('analogous');
  const [currentPalette, setCurrentPalette] = useState<Palette | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  
  // Load saved palettes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedPalettes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved palettes', e);
      }
    }
  }, []);
  
  // Generate a palette when baseColor or paletteType changes
  useEffect(() => {
    const colorHexes = generatePalette(baseColor, paletteType);
    
    const paletteColors: Color[] = colorHexes.map(hex => ({ hex }));
    
    setCurrentPalette({
      id: uuidv4(),
      baseColor: { hex: baseColor },
      colors: paletteColors,
      type: paletteType
    });
  }, [baseColor, paletteType]);
  
  // Save palettes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
  }, [savedPalettes]);
  
  const savePalette = () => {
    if (!currentPalette) return;
    
    const savedPalette: SavedPalette = {
      ...currentPalette,
      savedAt: Date.now()
    };
    
    setSavedPalettes(prev => [savedPalette, ...prev]);
    return savedPalette;
  };
  
  const deletePalette = (id: string) => {
    setSavedPalettes(prev => prev.filter(palette => palette.id !== id));
  };
  
  const loadPalette = (palette: SavedPalette) => {
    setBaseColor(palette.baseColor.hex);
    setPaletteType(palette.type);
  };
  
  const sharePalette = () => {
    if (!currentPalette) return '';
    
    const params = new URLSearchParams();
    params.set('color', currentPalette.baseColor.hex);
    params.set('type', currentPalette.type);
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl);
    
    return shareUrl;
  };
  
  const exportPalette = () => {
    if (!currentPalette) return;
    
    const colors = currentPalette.colors.map(c => c.hex).join('\n');
    const blob = new Blob([colors], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${currentPalette.baseColor.hex.slice(1)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Check URL parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get('color');
    const typeParam = params.get('type') as PaletteType | null;
    
    if (colorParam && /^#[0-9A-F]{6}$/i.test(colorParam)) {
      setBaseColor(colorParam);
    }
    
    if (typeParam && ['monochromatic', 'analogous', 'complementary', 'triadic', 'tetradic'].includes(typeParam)) {
      setPaletteType(typeParam);
    }
  }, []);
  
  return {
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
  };
};