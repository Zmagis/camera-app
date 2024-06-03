import { AppColors, DefaultTheme } from "styled-components/native";

const colors: AppColors = {
  primary: "#f47f6a",
  secondary: "#f6b89e",
  disabled: "#f2e4e0",
  text: "#ECEDEE",
  lightText: "#fefefe",
  background: "#151718",
};

export type Colors = keyof typeof colors;

export const lightTheme: DefaultTheme = {
  colors,
};
