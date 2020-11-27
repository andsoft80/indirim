import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  colors } from '@material-ui/core';
import "fontsource-comfortaa";
import shadows from './shadows';
import typography from './typography';

const white = '#FFFFFF';
const appColor = '#20843C';

const theme = createMuiTheme({
  palette: {
    white,
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      contrastText: white,
      main: appColor,
    },
    secondary: {
      main: colors.indigo[500]
    },
    error: {
      contrastText: white,
      main: colors.red[900],
    },
    warning: {
      contrastText: white,
      main: colors.orange[900]
    },
    text: {
      main: appColor,
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography: {
    fontFamily: 'Comfortaa',
    ...typography
  },
});

export default theme;
