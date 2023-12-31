import { ColorPalette } from "@data";
import { colors } from "@styles";

type Color = typeof colors.palette[0];

export const isEmptyColor = (color: ColorPalette | null | undefined): boolean => {
  return (color ?? null) === null || (color?.toString() ?? "") === "";
};

export const isNotEmptyColor = (color: ColorPalette | null | undefined): boolean => {
  return !isEmptyColor(color);
};

export const getColorByCode = (colorCode: string): ColorPalette => {
  const index = colors.palette.findIndex(
    (x: Color): boolean => {
      return x.color === colorCode;
    }
  );

  return Object.keys(ColorPalette)[index] as unknown as ColorPalette;
};

export const getColorCode = (color: ColorPalette): string => {
  const index = Object.keys(ColorPalette).findIndex(
    (x: string): boolean => {
      return x === color.toString();
    }
  );

  return colors.palette[index].color;
};

export const getContrastColorCode = (color: ColorPalette): string => {
  const index = Object.keys(ColorPalette).findIndex(
    (x: string): boolean => {
      return x === color.toString();
    }
  );

  return colors.palette[index].contrast;
};

export const getBackdropColorCode = (color: ColorPalette): string => {
  const index = Object.keys(ColorPalette).findIndex(
    (x: string): boolean => {
      return x === color.toString();
    }
  );

  return colors.palette[index].backdrop;
};
