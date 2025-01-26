import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6484c2',
    },
    secondary: {
      main: '#442d5d',
    },
    background: {
      default: '#eaedef',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily:  '"Cairo", "sans-serif"',
    fontSize: 16
  },
  spacing: 8,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2', 
        },
      },
    },
  },
});

export default theme;
