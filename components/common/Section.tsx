// components\common\Section.tsx

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/** Contenedor común de las secciones de la página, con encabezado lateral fijo en escritorio. */
export default function Section({
  id,
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
          <h2 id={headingId} className="text-lg font-semibold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {subtitle}
            </p>
          )}
        </header>

        <div className="min-w-0 space-y-6">
          {children}
        </div>
      </div>
    </section>
  );
}
