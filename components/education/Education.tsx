// components\education\Education.tsx

import Image from 'next/image';
import Link from 'next/link';
import estudios from '@/utils/education';
import { cn } from '@/lib/utils';

export default function Education() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{estudios.map((estudio, index) => (
        <div
          key={`${estudio.titulo}-${index}`}
          className="education-card group relative p-6 rounded-2xl border border-border/20 bg-card hover:border-border/40 hover:shadow-lg transition-all duration-200"
        >
          <div className="space-y-4">
            <div className="relative w-full">
              {estudio.img ? (
                <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden border border-border/20 bg-muted/20">
                  <Image
                    src={`/img/education/${estudio.img}`}
                    alt={`Certificado de ${estudio.titulo}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4"
                    priority={index < 4}
                  />

                  {estudio.certificado && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}

                  {estudio.encurso && (
                    <div className="absolute top-2 left-2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-md">
                      En curso
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-48 sm:h-52 md:h-56 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/10 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-foreground">En Progreso</div>
                    <div className="text-xs text-muted-foreground">Próximamente</div>
                  </div>
                </div>
              )}
            </div>

            {/* Contenido principal */}
            <div className="text-center space-y-3">
              <div>
                <h3 className={cn(
                  "font-semibold text-foreground leading-tight mb-2",
                  estudio.fontSize || "text-base sm:text-lg"
                )}>
                  {estudio.titulo}
                </h3>

                <Link
                  href={estudio.institucionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {estudio.institucionNombre}
                  <svg 
                    className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>

              {estudio.encurso && (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    En curso
                  </span>
                  {estudio.linkExtra && (
                    <Link
                      href={estudio.linkExtra}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 ml-1 transition-colors"
                    >
                      Ver progreso
                    </Link>
                  )}
                </div>
              )}

              {estudio.certificado && (
                <div className="pt-2">
                  <Link
                    href={estudio.certificado}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 rounded-lg text-sm font-medium text-primary transition-colors group/cert"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Ver certificado</span>
                    <svg className="w-3 h-3 opacity-70 group-hover/cert:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              )}

              {estudio.encurso && !estudio.certificado && (
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-700/30 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <span>Estudiando</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={cn(
            "absolute left-0 top-0 h-full w-1 rounded-r-full",
            (() => {
              if (estudio.certificado) return "bg-primary";
              if (estudio.encurso) return "bg-blue-500";
              return "bg-muted-foreground/30";
            })()
          )} />
        </div>
      ))}
    </div>
  );
}
