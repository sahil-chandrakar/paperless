import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

// ADD: Import our new Provider
import { ColorModeContextProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

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
      <body>
        {/* solve Flash of Unstyled Content problem */}
        <AppRouterCacheProvider>
            {/* The Provider now handles the Theme and CssBaseline inside it */}
            <ColorModeContextProvider>
              <Navbar /> 
              <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {children}
              </main>
            </ColorModeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}