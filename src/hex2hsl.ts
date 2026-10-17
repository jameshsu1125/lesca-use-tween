export const hexToHSL = (hex: string): [number, number, number] => {
  let rgb = [0, 0, 0];

  if (hex.length === 4) {
    rgb = [1, 2, 3].map((i) => parseInt(hex[i] + hex[i], 16));
  } else if (hex.length === 7) {
    rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  }

  const [r, g, b] = rgb.map((v) => v / 255);
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  let h: number;
  if (delta === 0) h = 0;
  else if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return [h, +(s * 100).toFixed(1), +(l * 100).toFixed(1)];
};
