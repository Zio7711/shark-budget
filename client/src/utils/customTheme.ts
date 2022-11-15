import color from "./color";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    dark: Palette["primary"];
    main: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    dark?: PaletteOptions["primary"];
    main?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true;
    main: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    dark: true;
    main: true;
  }
}

// declare module "@mui/material/Tabs" {
//   interface TabsPropsIndicatorColorOverrides {
//     dark: true;
//     main: true;
//   }
// }

//customize the color pallette options for material ui
const theme = createTheme({
  palette: {
    dark: {
      main: color.dark,
      // contrastText: "#fff",
    },

    main: {
      main: color.main,
      // contrastText: "#fff",
    },
  },
});

export default theme;
