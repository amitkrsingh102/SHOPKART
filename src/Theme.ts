import { PaletteMode } from "@mui/material";

export const shades = {
  default: {
    violet: {
      100: "#e0dcf4",
      200: "#c0bae9",
      300: "#a197dd",
      400: "#8175d2",
      500: "#6252c7",
      600: "#4e429f",
      700: "#3b3177",
      800: "#272150",
      900: "#141028",
    },

    blue: {
      100: "#d9dcef",
      200: "#b4badf",
      300: "#8e97d0",
      400: "#6975c0",
      500: "#4352b0",
      600: "#36428d",
      650: "#34418D",
      700: "#28316a",
      800: "#1b2146",
      900: "#0d1023",
    },
    secondary: {
      50: "#fcffff",
      100: "#cfcfcf",
      200: "#9f9f9f",
      300: "#6f6f6f",
      400: "#3f3f3f",
      500: "#0f0f0f",
      600: "#1e2330",
      700: "#161b28",
      800: "#24272e",
      900: "#030303",
    },
    primary: {
      100: "#feffff",
      200: "#feffff",
      300: "#fdffff",
      400: "#fdffff",
      500: "#fcffff",
      600: "#cacccc",
      700: "#979999",
      800: "#656666",
      900: "#323333",
      1000: "#ebedfc",
    },
  },
  dark: {},
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            // main: shades.default.purple[600],
            main: shades.default.violet[600],
          },
          divider: shades.default.primary[300],
          background: {
            default: shades.default.secondary[800],
            paper: shades.default.primary[400],
          },
          text: {
            primary: shades.default.secondary[600],
            secondary: shades.default.secondary[500],
          },
          icon: {
            primary: shades.default.primary[500],
          },
          search: {
            primary: shades.default.primary[500],
          },
          cart: {
            primary: shades.default.violet[300],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: shades.default.blue[500],
            // main: shades.default.purple[700],
          },

          divider: shades.default.primary[700],

          background: {
            default: shades.default.primary[1000],
            paper: shades.default.secondary[500],
          },
          text: {
            primary: shades.default.primary[100],
            secondary: shades.default.secondary[50],
          },
          icon: {
            primary: shades.default.primary[100],
          },
          search: {
            primary: shades.default.primary[300],
          },
          cart: {
            primary: shades.default.blue[400],
          },
        }),
  },
});
