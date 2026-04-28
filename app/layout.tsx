// app\layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/navbar/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Portfolio | Alejandro Portaluppi",
  description: "Portfolio IT de Alejandro Portaluppi, Desarrollador Web Full Stack",
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
    <html lang="es" className={cn("min-h-screen", "font-sans", geist.variable)}>
      <head>
      </head>
      <body className="antialiased bg-linear-to-br from-background via-background to-muted/20 min-h-screen">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,--theme(--color-primary/0.03),transparent_50%),radial-gradient(circle_at_80%_20%,--theme(--color-accent/0.03),transparent_50%),radial-gradient(circle_at_40%_40%,--theme(--color-muted/0.03),transparent_50%)] pointer-events-none -z-10" />
        <NavBar />
        <div className="relative pt-16 z-10">
          {children}
        </div>
        <Toaster richColors theme='light' toastOptions={{}} position="top-right" closeButton/>
      </body>
    </html>
  );
}
