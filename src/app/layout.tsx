'use client';

import { Figtree } from "next/font/google";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./globals.css";

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
});

const theme = createTheme({
  typography: {
    fontFamily: 'Figtree, Roboto, Arial, sans-serif', // הוסף את הפונט לרשימה
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${figtree.className}`}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
