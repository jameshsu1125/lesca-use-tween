export const hexToHSL = (H: any) => {
  let r: any = 0,
    g: any = 0,
    b: any = 0;

  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }

  r /= 255;
  g /= 255;
  b /= 255;

  let min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    delta = max - min,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (max == r) h = ((g - b) / delta) % 6;
  else if (max == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (max + min) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
};
