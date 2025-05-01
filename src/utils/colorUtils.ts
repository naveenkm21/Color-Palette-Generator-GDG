/**
 * Convert hex to HSL color
 * @param hex The hex color code
 * @returns HSL values as [h, s, l]
 */
export function hexToHSL(hex: string): [number, number, number] {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;
  
  // Find the min and max values to compute the luminance
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  
  return [h, s * 100, l * 100];
}

/**
 * Convert HSL to hex color
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns Hex color code
 */
export function HSLToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0;
  let g = 0;
  let b = 0;
  
  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    [r, g, b] = [x, 0, c];
  } else if (300 <= h && h < 360) {
    [r, g, b] = [c, 0, x];
  }
  
  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Generate a monochromatic palette based on a base color
 * @param baseColor The base color in hex
 * @param count Number of colors to generate
 * @returns Array of hex colors
 */
export function generateMonochromatic(baseColor: string, count: number = 5): string[] {
  const [h, s, l] = hexToHSL(baseColor);
  const palette: string[] = [];
  
  // Create variations by adjusting lightness
  for (let i = 0; i < count; i++) {
    const newL = Math.max(10, Math.min(90, l - 30 + (i * 60 / (count - 1))));
    palette.push(HSLToHex(h, s, newL));
  }
  
  return palette;
}

/**
 * Generate an analogous palette based on a base color
 * @param baseColor The base color in hex
 * @param count Number of colors to generate
 * @returns Array of hex colors
 */
export function generateAnalogous(baseColor: string, count: number = 5): string[] {
  const [h, s, l] = hexToHSL(baseColor);
  const palette: string[] = [];
  
  // Create variations by adjusting hue
  const hueStep = 30;
  const startHue = (h - (hueStep * Math.floor(count / 2))) % 360;
  
  for (let i = 0; i < count; i++) {
    const newH = (startHue + (i * hueStep)) % 360;
    palette.push(HSLToHex(newH, s, l));
  }
  
  return palette;
}

/**
 * Generate a complementary palette based on a base color
 * @param baseColor The base color in hex
 * @returns Array of hex colors
 */
export function generateComplementary(baseColor: string): string[] {
  const [h, s, l] = hexToHSL(baseColor);
  const complementaryH = (h + 180) % 360;
  
  return [
    baseColor,
    HSLToHex(complementaryH, s, l),
    HSLToHex(h, s * 0.7, l * 1.2),
    HSLToHex(complementaryH, s * 0.7, l * 1.2),
    HSLToHex(h, s * 0.9, l * 0.8)
  ];
}

/**
 * Generate a triadic palette based on a base color
 * @param baseColor The base color in hex
 * @returns Array of hex colors
 */
export function generateTriadic(baseColor: string): string[] {
  const [h, s, l] = hexToHSL(baseColor);
  
  return [
    baseColor,
    HSLToHex((h + 120) % 360, s, l),
    HSLToHex((h + 240) % 360, s, l),
    HSLToHex(h, s * 0.8, l * 1.2),
    HSLToHex((h + 120) % 360, s * 0.8, l * 1.2)
  ];
}

/**
 * Generate a tetradic palette based on a base color
 * @param baseColor The base color in hex
 * @returns Array of hex colors
 */
export function generateTetradic(baseColor: string): string[] {
  const [h, s, l] = hexToHSL(baseColor);
  
  return [
    baseColor,
    HSLToHex((h + 90) % 360, s, l),
    HSLToHex((h + 180) % 360, s, l),
    HSLToHex((h + 270) % 360, s, l),
    HSLToHex(h, s * 0.8, l * 1.2)
  ];
}

/**
 * Generate a palette based on the specified type
 * @param baseColor The base color in hex
 * @param type The palette type
 * @returns Array of hex colors
 */
export function generatePalette(baseColor: string, type: string): string[] {
  switch (type) {
    case 'monochromatic':
      return generateMonochromatic(baseColor);
    case 'analogous':
      return generateAnalogous(baseColor);
    case 'complementary':
      return generateComplementary(baseColor);
    case 'triadic':
      return generateTriadic(baseColor);
    case 'tetradic':
      return generateTetradic(baseColor);
    default:
      return generateMonochromatic(baseColor);
  }
}

/**
 * Check if text should be white or black based on background color
 * @param bgColor Background color in hex
 * @returns 'white' or 'black'
 */
export function getTextColor(bgColor: string): string {
  const [, , l] = hexToHSL(bgColor);
  return l > 60 ? 'black' : 'white';
}

/**
 * Generate a random hex color
 * @returns Random hex color
 */
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

/**
 * Get a color name based on its position in the palette
 * @param index The index in the palette
 * @param type The palette type
 * @returns Color name
 */
export function getColorName(index: number, type: string): string {
  if (type === 'monochromatic') {
    const names = ['Base', 'Lighter', 'Lightest', 'Darker', 'Darkest'];
    return names[index] || `Shade ${index + 1}`;
  } else if (type === 'complementary') {
    const names = ['Base', 'Complement', 'Light Base', 'Light Complement', 'Dark Base'];
    return names[index] || `Color ${index + 1}`;
  } else if (type === 'analogous') {
    return index === 2 ? 'Base' : `Analog ${index + 1}`;
  } else if (type === 'triadic') {
    const names = ['Base', 'Triad 1', 'Triad 2', 'Light Base', 'Light Triad 1'];
    return names[index] || `Color ${index + 1}`;
  } else if (type === 'tetradic') {
    const names = ['Base', 'Tetrad 1', 'Tetrad 2', 'Tetrad 3', 'Light Base'];
    return names[index] || `Color ${index + 1}`;
  }
  
  return `Color ${index + 1}`;
}