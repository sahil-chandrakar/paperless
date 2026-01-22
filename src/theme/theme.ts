'use client';
import { createTheme } from '@mui/material/styles';
import { Merriweather, Inter } from 'next/font/google';

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

export const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // --- LIGHT MODE (Classic Medium) ---
          primary: { main: '#1a8917' },
          background: { default: '#ffffff', paper: '#ffffff' },
          text: { primary: '#242424', secondary: '#757575' },
          divider: '#f2f2f2', // Very subtle borders
        }
      : {
          // --- DARK MODE (Premium Dark) ---
          primary: { main: '#2e7d32' }, // Slightly adjusted green for dark bg
          background: { 
            default: '#191919', // The exact "Medium" dark grey
            paper: '#191919'    // Keep cards same color as bg for flat look
          },
          text: { 
            primary: '#e6e6e6', // Soft White (easier on eyes than pure #FFF)
            secondary: '#a8a8a8' // Lighter grey for readable subtitles
          },
          divider: '#2d2d2d', // Darker borders for subtle separation
          action: {
            hover: 'rgba(255, 255, 255, 0.08)', // Smoother hover effects
          }
        }),
  },
  typography: {
    fontFamily: sansFont.style.fontFamily,
    h1: { fontFamily: serifFont.style.fontFamily, fontWeight: 900 },
    h2: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
    h3: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
    h4: { fontFamily: serifFont.style.fontFamily, fontWeight: 700 },
    body1: {
      fontFamily: serifFont.style.fontFamily,
      fontSize: '1.125rem', // 18px - Standard blog size
      lineHeight: 1.6,
    },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Seamless look: Navbar matches the background color exactly
          backgroundColor: mode === 'light' ? '#ffffff' : '#191919', 
          color: mode === 'light' ? '#000000' : '#ffffff',
          borderBottom: `1px solid ${mode === 'light' ? '#f2f2f2' : '#2d2d2d'}`,
          transition: 'all 0.3s ease', // Smooth transition when toggling
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Rounded buttons like Medium
        }
      }
    }
  },
});