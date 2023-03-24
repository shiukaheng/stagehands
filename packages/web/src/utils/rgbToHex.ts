export function rgbToHex([r, g, b]: number[]) {
    const componentToHex = (c: number) => {
      const hex = Math.round(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;}
    return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
  }