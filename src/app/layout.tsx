import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// 1. IMPORT GOOGLE FONTS
import { Playfair_Display, Source_Sans_3 } from "next/font/google";

import { ColorModeContextProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Box from '@mui/material/Box';
import "./globals.css";

// 2. CONFIGURE FONTS
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-serif', // Use this variable in CSS/MUI
  display: 'swap',
});

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"], 
  variable: '--font-sans', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Paperless",
  description: "A place for my personal learnings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. APPLY FONT VARIABLES TO BODY */}
      <body className={`${playfair.variable} ${sourceSans.variable}`}>
        <AppRouterCacheProvider>
            <ColorModeContextProvider>
              <Box sx={{ 
                minHeight: '100vh', 
                backgroundColor: 'background.default',
                color: 'text.primary',
                fontFamily: 'var(--font-sans)', // Set global default font
              }}>
                <Navbar />
                
                {/* 4. CONTENT WRAPPER */}
                {/* We removed the hardcoded '1200px' limit here so pages can decide their own width */}
                <Box component="main">
                  {children}
                </Box>
              </Box>
            </ColorModeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}