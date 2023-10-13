import { createTheme } from '@material-ui/core/styles';
import * as Colors from './colors';

const theme = createTheme({
  typography: {
    fontFamily: [
      // 'Barlow',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      // 'Nunito',
      'Barlow',
      'NunitoRegular',
    ].join(','),
    fontWeight: 'normal',
  },
  palette: {
    text: { primary: Colors.Dark },
    primary: {
      main: Colors.PrimaryUltrasoft,
    },
    secondary: {
      main: Colors.Dark,
    },
    success: { main: Colors.SecondaryMedium },
    error: { main: Colors.RedMedium },
    background: {
      default: Colors.GrayUltrasoft,
    },
  },
  status: {
    active: Colors.SecondaryMedium,
    hold: Colors.RedMedium,
  },
});

export default theme;
