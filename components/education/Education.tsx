// components\education\Education.tsx

import Image from 'next/image';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import estudios from '@/content/education';

const accionClassName = "inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-brand/40 underline-offset-4 hover:decoration-brand transition-colors";

export default function Education() {
  return (
    <ul className="divide-y divide-border/70">
      {estudios.map((estudio) => (
        <li key={estudio.titulo} className="flex gap-5 py-6 first:pt-0 last:pb-0">
          <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-lg border bg-white sm:block">
            {estudio.img ? (
              <Image
                src={`/img/education/${estudio.img}`}
                alt={`Certificado de ${estudio.titulo}`}
                fill
                sizes="112px"
                className="object-contain p-1.5"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <GraduationCap className="size-6 text-muted-foreground" aria-hidden />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-semibold leading-snug text-pretty">{estudio.titulo}</h3>
              {estudio.encurso && (
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[0.7rem] uppercase text-brand">
                  En curso
                </span>
              )}
            </div>

            <a
              href={estudio.institucionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {estudio.institucionNombre}
            </a>

            {(estudio.certificado || estudio.linkExtra) && (
              <div className="mt-3 flex flex-wrap gap-4">
                {estudio.certificado && (
                  <a href={estudio.certificado} target="_blank" rel="noopener noreferrer" className={accionClassName}>
                    Ver certificado
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
                {estudio.linkExtra && (
                  <a href={estudio.linkExtra} target="_blank" rel="noopener noreferrer" className={accionClassName}>
                    Ver progreso
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
