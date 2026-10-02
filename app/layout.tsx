// app\layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/navbar/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const geistMono = Geist_Mono({subsets:['latin'],variable:'--font-mono'});

export const metadata: Metadata = {
  title: "Portfolio | Alejandro Portaluppi",
  description: "Portfolio IT de Alejandro Portaluppi, Desarrollador Web Full Stack",
  openGraph: {
    title: "Alejandro Portaluppi | Desarrollador Web Full Stack",
    description: "Portfolio IT de Alejandro Portaluppi, Desarrollador Web Full Stack",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/img/favicon-dark.ico",
        href: "/img/favicon-dark.ico"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/img/favicon.ico",
        href: "/img/favicon.ico"
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // next-themes agrega la clase del tema en <html> antes de hidratar, por eso hay que ignorar esa diferencia
    <html lang="es" suppressHydrationWarning className={cn("min-h-screen", "font-sans", geist.variable, geistMono.variable)}>
      <body className="antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavBar />
          {children}
          <Toaster richColors position="top-right" closeButton/>
        </ThemeProvider>
      </body>
    </html>
  );
}
