// components\footer\Footer.tsx

import { ArrowUpRight } from 'lucide-react';
import { redes } from '@/content/social';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          Alejandro Portaluppi
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {redes.map((red) => (
            <li key={red.href}>
              <a
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-0.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {red.nombre}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
