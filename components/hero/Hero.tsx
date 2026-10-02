// components\hero\Hero.tsx

import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CV_URL, redes } from '@/content/social';
import SkillTicker from './SkillTicker';

const redesDestacadas = redes.filter(red => red.nombre === "LinkedIn" || red.nombre === "GitHub");

export default function Hero() {
  return (
    <>
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem]" />

      <section id="top" className="pt-32 pb-20 sm:pt-44 sm:pb-28">
        <p className="animate-enter font-mono text-sm text-muted-foreground">
          Hola, soy
        </p>

        <h1 className="animate-enter [--enter-order:1] mt-3 text-5xl font-semibold tracking-tighter text-balance sm:text-7xl">
          Alejandro Portaluppi
        </h1>

        <p className="animate-enter [--enter-order:2] mt-6 max-w-xl text-lg text-muted-foreground text-pretty sm:text-xl">
          <span className="text-foreground">Desarrollador Web Full Stack.</span> Construyo aplicaciones web completas, de la interfaz a la base de datos.
        </p>

        <div className="animate-enter [--enter-order:3] mt-6">
          <SkillTicker />
        </div>

        <div className="animate-enter [--enter-order:4] mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-10 px-4">
            <Link href="#contact">Contactame</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-10 px-4">
            <a href={CV_URL} target="_blank" rel="noopener noreferrer">
              <FileText data-icon="inline-start" />
              Ver CV
            </a>
          </Button>
          {redesDestacadas.map(red => (
            <Button key={red.href} asChild size="lg" variant="ghost" className="h-10 px-3 text-muted-foreground">
              <a href={red.href} target="_blank" rel="noopener noreferrer">
                {red.nombre}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          ))}
        </div>
      </section>
    </>
  );
}
