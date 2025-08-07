// components\title\Title.tsx

"use client"

import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useEffect, useRef } from 'react';
import Skills from './Skills';

gsap.registerPlugin(SplitText);

export default function Title() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitText(titleRef.current, { type: "chars" });
    const animations: gsap.core.Tween[] = [];

    split.chars.forEach((char: Element) => {
      const randomX = (Math.random() - 0.5) * 250;
      const randomY = (Math.random() - 0.5) * 250;

      const tween = gsap.fromTo(char,
        {
          x: randomX,
          y: randomY,
          opacity: 0,
          scale: 0
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: Math.random() * 0.5 + 0.5,
          ease: "back.out(1.7)"
        }
      );

      animations.push(tween);
    });

    return () => {
      animations.forEach(tween => tween.kill());
      split.revert();
    };
  }, []);

  return (
    <div className='space-y-3'>
      <h1 className='text-center text-xl sm:text-3xl' ref={titleRef}>Portfolio | Alejandro Portaluppi</h1>

      <Skills />
    </div>
  )
}
