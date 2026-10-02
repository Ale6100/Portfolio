// components\hero\SkillTicker.tsx

"use client"

import { useEffect, useState } from 'react';
import { skills } from '@/content/skills';
import { elementoAlAzar } from '@/lib/utils';

const INTERVALO_MS = 2800;

export default function SkillTicker() {
  const [ skill, setSkill ] = useState(skills[0]);

  useEffect(() => {
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = setInterval(() => {
      setSkill(actual => elementoAlAzar(skills.filter(s => s !== actual)));
    }, INTERVALO_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground" aria-hidden>
      <span className="text-brand">$</span>
      <span key={skill} className="animate-enter [--enter-order:0] truncate">{skill}</span>
      <span className="animate-caret h-4 w-2 shrink-0 bg-brand/70" />
    </p>
  );
}
