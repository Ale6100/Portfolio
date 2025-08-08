"use client";

import Link from 'next/link';
import { redes } from '@/utils/footer';

export default function Footer() {
  return (
    <footer className="relative mt-12 sm:mt-20 py-6 sm:py-8 border-t border-border/30 bg-gradient-to-t from-card/50 to-transparent backdrop-blur-sm">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
          {redes.map((red) => (
            <Link
              key={red.href}
              href={red.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-2 sm:p-3 rounded-xl transition-all duration-300 bg-card/30 border border-border/20 hover:bg-card/60 hover:border-primary/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Visitar ${red.p}`}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 group-hover:opacity-100" />
              <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                <img
                  src={red.src}
                  alt={red.alt}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded-md opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap z-10 hidden sm:block group-hover:opacity-100 group-hover:-translate-y-1">
                {red.p}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary/90" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}