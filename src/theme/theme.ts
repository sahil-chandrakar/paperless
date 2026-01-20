'use client';
import { createTheme } from '@mui/material/styles';
import { Merriweather, Inter } from 'next/font/google';

// 1. Configure the fonts
const serifFont = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const sansFont = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

// 2. Override the default MUI Theme
const theme = createTheme({
  typography: {
    fontFamily: sansFont.style.fontFamily, 
    h1: {
      fontFamily: serifFont.style.fontFamily, 
      fontWeight: 900,
      color: '#242424', 
    },
    h2: {
      fontFamily: serifFont.style.fontFamily,
      fontWeight: 700,
      color: '#242424',
    },
    body1: {
      fontFamily: serifFont.style.fontFamily, 
      fontSize: '1.1rem',
      lineHeight: 1.6, 
      color: '#292929',
    },
    button: {
      textTransform: 'none', 
      fontWeight: 500,
    },
  },
  //defining the colors of the site
  palette: {
    primary: {
      main: '#1a8917', 
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#242424',
      secondary: '#757575',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: 'none', // we are using a flat header with a border
          borderBottom: '1px solid #f2f2f2',
        },
      },
    },
  },
});

export default theme;