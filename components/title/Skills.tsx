// components\title\Skills.tsx

"use client"

import { gsap } from 'gsap';
import { SplitText } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { skills } from '@/utils/skills';
import { colorRandom, elementoAlAzar, numeroAlAzar } from '@/lib/utils';

export default function Skills() {
  const [ skill, setSkill ] = useState(skills[0]);

  const skillRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!skillRef.current) return;

    const split = new SplitText(skillRef.current, { type: "chars" });

    gsap.set(split.chars, {
      opacity: 0,
      color: "transparent",
      y: 20,
      scale: 0,
      rotation: () => numeroAlAzar(-180, 180),
    });

    const timeline = gsap.timeline({
      defaults: {
        stagger: 0.05,
      }
    });

    timeline
      .to(split.chars, {
        delay: 1,
        opacity: 1,
        color: "#000000",
        y: 0,
        scale: 1,
        rotation: 0,
        ease: "elastic.out(1, 0.5)"
      })
      .to(split.chars, {
        delay: 3,
        color: colorRandom({ disableRed: 0 }),
        scale: 1.1,
        y: -8,
        rotation: () => numeroAlAzar(-15, 15),
        ease: "back.out"
      })
      .to(split.chars, {
        color: "#000000",
        scale: 1,
        y: 0,
        rotation: 0,
        ease: "power2.out"
      })
      .to(split.chars, {
        opacity: 0,
        color: "transparent",
        y: 20,
        scale: 0,
        rotation: numeroAlAzar(-180, 180),
        ease: "elastic.in(1, 0.5)",
        onComplete: () => {
          const otherSkills = skills.filter(s => s !== skill);
          setSkill(elementoAlAzar(otherSkills.length ? otherSkills : skills));
        }
      });

  }, [skill]);

  return (
    <p className='text-center text-base sm:text-xl' ref={skillRef}>{skill}</p>
  );
}
