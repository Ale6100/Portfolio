// components\title\Title.tsx

"use client"

import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Skills from './Skills';
import { numeroAlAzar } from '@/lib/utils';

gsap.registerPlugin(SplitText);

export default function Title() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitText(titleRef.current, { type: "chars" });
    const timeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.33 });

    gsap.set(split.chars, {
      x: () => numeroAlAzar(-200, 200),
      y: () => numeroAlAzar(-200, 200),
      opacity: 0,
      scale: 0
    });

    timeline.to(split.chars, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      duration: () => numeroAlAzar(0.5, 1),
      ease: "back.out(1.7)",
      stagger: {
        amount: 1,
        from: "random"
      },
    })
    .to(split.chars, {
      delay: 60
    });

    return () => {
      timeline.kill();
      split.revert();
    };
  }, []);

  return (
    <div className='space-y-3'>
      <h1 className='text-center text-xl sm:text-3xl' ref={titleRef}>Portfolio | Alejandro Portaluppi</h1>

      {/* No lo renderizo en celulares porque sería muy pesado para muchos de ellos */}
      {isMounted && isTabletOrDesktop && <Skills />}
    </div>
  )
}
