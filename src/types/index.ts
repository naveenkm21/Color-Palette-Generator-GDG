export interface Color {
  hex: string;
  name?: string;
}

export interface Palette {
  id: string;
  baseColor: Color;
  colors: Color[];
  type: PaletteType;
}

export type PaletteType = 'analogous' | 'monochromatic' | 'complementary' | 'triadic' | 'tetradic';

export interface SavedPalette extends Palette {
  savedAt: number;
}