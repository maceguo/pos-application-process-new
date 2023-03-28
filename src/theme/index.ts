import {
  cyan,
  deepOrange,
  orange,
  pink,
  teal,
  yellow,
} from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    constant_primary: string;
    white_60: string;
    white_40: string;
    white: string;
    yellow_hover: string;
    yellow_title: string;
    blue_title: string;
    blue_dark: string;
  }

  interface TypeBackground {
    banner: string;
    white: string;
    icon: string;
    footer: string;
    homepage: string;
    float: string;
    dark: string;
    accordion_summary: string;
    nav: string;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
        text: {
          constant_primary: 'rgba(0,0,0,.87)',
          primary: 'rgba(0,0,0,.87)',
          secondary: 'rgba(0,0,0,.6)',
          disabled: 'rgba(0,0,0,.38)',
          white_40: 'rgba(255,255,255,.4)',
          white_60: 'rgba(255,255,255,.6)',
          white: 'rgba(255,255,255,1)',
          yellow_hover: '#FFE492',
          yellow_title: '#F3D370',
          blue_title: '#1134E3',
          blue_dark: '#041256',
        },
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
        text: {
          constant_primary: 'rgba(0,0,0,.87)',
          primary: 'rgba(0,0,0,.87)',
          secondary: 'rgba(0,0,0,.6)',
          disabled: 'rgba(0,0,0,.38)',
          white_40: 'rgba(255,255,255,.4)',
          white_60: 'rgba(255,255,255,.6)',
          white: 'rgba(255,255,255,1)',
          yellow_hover: '#FFE492',
          yellow_title: '#F3D370',
          blue_title: '#a134E3',
          blue_dark: '#041256',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h3: {
      fontFamily: 'Roboto',
      fontSize: 24,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'Roboto',
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 400,
    },
  },
});
