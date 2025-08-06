// app\layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/navbar/NavBar";

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
    <html lang="es">
      <head>
      </head>
      <body className="antialiased bg-slate-100">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
