// components\common\Reveal.tsx

"use client"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ReactNode, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Hace aparecer su contenido la primera vez que entra en pantalla */
export default function Reveal({ children, className }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    // Lo que ya está visible al cargar no se anima: ocultarlo y volver a mostrarlo se vería como un parpadeo
    if (!container || ScrollTrigger.isInViewport(container)) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Se anima opacity y no autoAlpha para que el contenido siga siendo enfocable y legible por lectores de pantalla antes de aparecer
      gsap.from(container, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
