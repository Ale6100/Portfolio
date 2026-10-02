// components\common\Section.tsx

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Reveal from './Reveal';

interface SectionProps {
  readonly id: string;
  readonly index: number;
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export default function Section({
  id,
  index,
  title,
  subtitle,
  className,
  children
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-14 border-t border-border/70 py-16 sm:py-20", className)}
    >
      <div className="grid gap-8 md:grid-cols-[11rem_1fr] md:gap-12">
        <header className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-xs text-brand" aria-hidden>
            {String(index).padStart(2, "0")}
          </p>
          <h2 id={headingId} className="mt-1 text-lg font-semibold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {subtitle}
            </p>
          )}
        </header>

        <Reveal className="min-w-0 space-y-6">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
