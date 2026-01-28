'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Merriweather, Inter, Playfair_Display } from 'next/font/google';

// 1. Main Reading Fonts (Keep these as you like them)
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

// 2. The "Stylish" Logo Font (Playfair Display)
// We export this so we can use it specifically in the Navbar
export const logoFont = Playfair_Display({
  weight: ['700', '900'], // Bold and Black weights for logo
  subsets: ['latin'],
  display: 'swap',
});

export const getTheme = (mode: 'light' | 'dark') => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light Mode
            primary: { main: '#1a8917' },
            background: { default: '#ffffff', paper: '#ffffff' },
            text: { primary: '#242424', secondary: '#757575' },
            divider: '#f2f2f2',
          }
        : {
            // Dark Mode
            primary: { main: '#2e7d32' },
            background: { default: '#191919', paper: '#191919' },
            text: { primary: '#e6e6e6', secondary: '#a8a8a8' },
            divider: '#2d2d2d',
            action: { hover: 'rgba(255, 255, 255, 0.08)' },
          }),
    },
    typography: {
      fontFamily: sansFont.style.fontFamily,
      // KEEPING YOUR PREFERRED FONTS HERE:
      h1: { fontFamily: serifFont.style.fontFamily, fontWeight: 900 },
      h2: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
      h3: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
      h4: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
      body1: {
        fontFamily: serifFont.style.fontFamily,
        fontSize: '1.125rem',
        lineHeight: 1.6,
      },
      button: { textTransform: 'none', fontWeight: 500 },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#191919',
            color: mode === 'light' ? '#000000' : '#ffffff',
            borderBottom: `1px solid ${mode === 'light' ? '#f2f2f2' : '#2d2d2d'}`,
            transition: 'all 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: '20px' }
        }
      }
    },
  });

  return responsiveFontSizes(theme);
};