// components\experience\Experience.tsx

'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import experiencia from '@/lib/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.experience-item');

    items.forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.set(item, {
        y: 50,
        opacity: 0,
        scale: 0.95
      });

      tl.to(item, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    });

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    mainTimeline.fromTo(items,
      {
        y: 50,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }
    );

    return () => {
      mainTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {experiencia.map((exp) => (
        <div
          key={`${exp.nombre}-${exp.fechaInicio}`}
          className="experience-item group relative p-4 rounded-xl border border-border/30 bg-card/50 hover:border-border/60 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto sm:mx-0 flex-shrink-0 rounded-sm overflow-hidden border border-border/20 bg-gradient-to-br from-muted/50 to-muted/20 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={`/img/experience/${exp.img}`}
                alt={`Logo de ${exp.nombre}`}
                fill
                className="object-contain transition-transform duration-300"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                    {exp.nombre}
                  </h3>
                  <p className="text-muted-foreground font-medium mt-1 text-xs sm:text-sm">
                    {exp.puesto}
                  </p>
                </div>

                <div className="text-sm text-muted-foreground bg-muted/40 px-3 py-1 rounded-lg border border-border/20 whitespace-nowrap self-center sm:self-start">
                  {exp.fechaInicio} {exp.fechaFin && `- ${exp.fechaFin}`}
                </div>
              </div>

              {!exp.fechaFin && (
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Trabajo actual
                  </span>
                </div>
              )}

              {exp.tecnologias && (
                <div className="mb-4">
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2.5 flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded bg-primary/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded bg-primary/60" />
                      </div>
                      Tecnologías principales
                    </h4>
                    <div className="space-y-2.5">
                      {exp.tecnologias.frontend && exp.tecnologias.frontend.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-medium min-w-[4rem] opacity-75">
                            Frontend:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tecnologias.frontend.map((tech) => (
                              <span
                                key={`${exp.nombre}-frontend-${tech}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded hover:bg-primary/15 hover:border-primary/30 transition-all duration-200"
                              >
                                <div className="w-1 h-1 bg-primary/80 rounded-full" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {exp.tecnologias.backend && exp.tecnologias.backend.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground font-medium min-w-[4rem] opacity-75">
                            Backend:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.tecnologias.backend.map((tech) => (
                              <span
                                key={`${exp.nombre}-backend-${tech}`}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/60 rounded hover:bg-orange-100 dark:hover:bg-orange-900/60 hover:border-orange-300/80 dark:hover:border-orange-700/80 transition-all duration-200"
                              >
                                <div className="w-1 h-1 bg-orange-500/80 rounded-full" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {exp.responsabilidades && (
                <div className="mt-4 pt-4 border-t border-border/20">
                  {exp.responsabilidades.tareas && exp.responsabilidades.tareas.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2.5 flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-blue-500/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded bg-blue-500/60" />
                        </div>
                        {exp.responsabilidades.tareas.length === 1 ? "Responsabilidad principal" : "Responsabilidades principales"}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                        {exp.responsabilidades.tareas.map((tarea) => (
                          <div
                            key={`${exp.nombre}-tarea-${tarea.substring(0, 20).replace(/\s+/g, '-')}`}
                            className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 hover:bg-muted/30 rounded-lg p-2 transition-colors duration-200"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500/60 rounded-full mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{tarea}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 group-hover:from-primary/50 group-hover:via-primary/70 group-hover:to-primary/50 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
}
