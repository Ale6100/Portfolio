// components\experience\Experience.tsx

import Image from 'next/image';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import experiencia from '@/content/experience';
import { cn } from '@/lib/utils';

const parsearMesAnio = (mesAnio: string) => parse(mesAnio, "MM/yyyy", new Date());

function Fecha({ mesAnio }: { readonly mesAnio: string }) {
  const fecha = parsearMesAnio(mesAnio);
  return <time dateTime={format(fecha, "yyyy-MM")}>{format(fecha, "MMM yyyy", { locale: es })}</time>;
}

export default function Experience() {
  return (
    <ol className="relative space-y-12 border-l border-border pl-6 sm:pl-8">
      {experiencia.map((exp) => {
        const esActual = !exp.fechaFin;

        return (
          <li key={`${exp.nombre}-${exp.fechaInicio}`} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute top-3 size-2.5 rounded-full ring-4 ring-background",
                "-left-[calc(1.5rem+5.5px)] sm:-left-[calc(2rem+5.5px)]",
                esActual ? "bg-brand" : "bg-muted-foreground/40"
              )}
            />

            <div className="flex items-start gap-4">
              <Image
                src={`/img/experience/${exp.img}`}
                alt={`Logo de ${exp.nombre}`}
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-lg border bg-white object-contain p-1"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold leading-snug">
                    {exp.puesto}
                    <span className="font-normal text-muted-foreground"> · {exp.nombre}</span>
                  </h3>
                  <p className="font-mono text-xs uppercase text-muted-foreground">
                    <Fecha mesAnio={exp.fechaInicio} />
                    {" — "}
                    {exp.fechaFin ? <Fecha mesAnio={exp.fechaFin} /> : "Actualidad"}
                  </p>
                </div>

                {esActual && (
                  <p className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-current motion-safe:animate-pulse" />
                    Trabajo actual
                  </p>
                )}

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {exp.tareas.map((tarea) => (
                    <li key={tarea} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brand/60" />
                      <span className="text-pretty">{tarea}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                  {exp.tecnologias.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border bg-muted/60 px-2 py-0.5 font-mono text-xs text-foreground/80"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
