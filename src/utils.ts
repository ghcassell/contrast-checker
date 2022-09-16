import queryString from "query-string";
import hexSorter from "hexsorter";
import { firstBy } from "thenby";

export const palette = [
  "#FFFFFF",
  "#464131",
  "#E1E1E1",
  "#F9F9F9",
  "#FFDC14",
  "#009BBE",
  "#97D4E2",
  "#6EC3BA",
  "#A8DBD6"
];

export const validatePallette = (): boolean => {
  try {
    const params = queryString.parse(window.location.search);
    if (params?.p) {
      const list = params.p.toString().split(",");

      for (let i = 0; i < list.length; i++) {
        if (/^[0-9A-F]{6}$/i.test(list[i].trim()) === false) {
          return false;
        }
      }
    }
    return true;
  } catch {
    return false;
  }
};

export const getPalette = () => {
  const params = queryString.parse(window.location.search);
  let paletteToUse = palette;
  if (params?.p) {
    paletteToUse = params.p
      .toString()
      .split(",")
      .map((v) => `#${v.trim()}`);
  }

  var sortedColours = hexSorter.sortColors(paletteToUse, "mostBrightColor");
  //return paletteToUse;
  return sortedColours;
};

export interface IResult {
  color1: string;
  color2: string;
  aaNormalPassed: boolean;
  aaLargePassed: boolean;
  aaaNormalPassed: boolean;
  aaaLargePassed: boolean;
  color1Sort: number;
  color2Sort: number;
}

/* Utils from https://codepen.io/alvaromontoro/pen/YgpWZG?editors=1010 */

const aaNormalRatio = 0.22222;
const aaLargeRatio = 0.33333;
const aaaNormalRatio = 0.14285;
const aaaLargeRatio = 0.22222;

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

/* the following functions are adapted from https://stackoverflow.com/a/9733420/3695983 */
function luminanace(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export const contrastRatio = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const luminanceFront = luminanace(rgb1["r"], rgb1["g"], rgb1["b"]);
  const luminanceBack = luminanace(rgb2["r"], rgb2["g"], rgb2["b"]);

  return luminanceBack > luminanceFront
    ? (luminanceFront + 0.05) / (luminanceBack + 0.05)
    : (luminanceBack + 0.05) / (luminanceFront + 0.05);
};

export enum Compliance {
  AA = "AA",
  AAA = "AAA"
}

export const passesNormal = (hex1, hex2, compliance = Compliance.AA) => {
  const ratio = compliance === Compliance.AA ? aaNormalRatio : aaaNormalRatio;
  return contrastRatio(hex1, hex2) < ratio;
};

export const passesLarge = (hex1, hex2, compliance = Compliance.AA) => {
  const ratio = compliance === Compliance.AA ? aaLargeRatio : aaaLargeRatio;
  return contrastRatio(hex1, hex2) < ratio;
};

export const getResults = (): IResult[] => {
  const palette = getPalette();

  let results: IResult[] = [];
  for (let index = 0; index < palette.length - 1; index++) {
    for (let index2 = index + 1; index2 < palette.length; index2++) {
      const color1 = palette[index];
      const color2 = palette[index2];
      const aaNormalPassed = passesNormal(color1, color2, Compliance.AA);
      const aaLargePassed = passesLarge(color1, color2, Compliance.AA);
      const aaaNormalPassed = passesNormal(color1, color2, Compliance.AAA);
      const aaaLargePassed = passesLarge(color1, color2, Compliance.AAA);
      const color1Sort = index;
      const color2Sort = index2;

      results.push({
        color1,
        color2,
        aaNormalPassed,
        aaLargePassed,
        aaaNormalPassed,
        aaaLargePassed,
        color1Sort,
        color2Sort
      });
    }
  }

  return results
    .sort(
      firstBy("aaNormalPassed")
        .thenBy("aaLargePassed")
        .thenBy("aaaNormalPassed")
        .thenBy("aaaLargePassed")
        .thenBy("color1Sort")
        .thenBy("color2Sort")
    )
    .reverse();
};
