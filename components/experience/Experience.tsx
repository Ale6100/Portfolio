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
            <div className="relative w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto sm:mx-0 flex-shrink-0 rounded-xl overflow-hidden border border-border/20 bg-gradient-to-br from-muted/50 to-muted/20 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={`/img/experience/${exp.img}`}
                alt={`Logo de ${exp.nombre}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
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
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Trabajo actual
                  </span>
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
