// components\technologies\Technologies.tsx

import Image from 'next/image'
import tecnologias from '@/lib/technologies'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Technologies() {
  return (
    <div
      className={cn(
        'grid gap-3',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      )}
    >
      {([...tecnologias]
        .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
        .map((t) => {
        const src = t.img
        const isRemote = src.startsWith('http')
        return (
          <Link
            key={t.title}
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${t.title}`}
            title={t.title}
            className={cn(
              'group relative overflow-hidden rounded-xl',
              'border border-border/40 bg-card/60',
              'hover:bg-card/90 hover:border-border/70',
              'transition-all duration-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform duration-300 group-hover:scale-110" />

            <div className="flex flex-col items-center justify-center gap-2 px-4 py-5">
              <div
                className={cn(
                  'relative flex items-center justify-center',
                  'h-12 w-12 sm:h-14 sm:w-14 rounded-lg',
                  'bg-gradient-to-br from-muted/50 to-muted/20',
                  'border border-border/30',
                  'shadow-sm',
                  'group-hover:scale-105 group-hover:shadow-md transition-all duration-300'
                )}
              >
                <Image
                  src={src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 56px"
                  className="object-contain p-2"
                  unoptimized={isRemote}
                />
              </div>

              <span
                className={cn(
                  'text-center text-xs sm:text-sm font-medium',
                  'text-foreground/90',
                  'group-hover:text-primary transition-colors duration-300'
                )}
              >
                {t.title}
              </span>

              <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/30 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          </Link>
        )
  }))}
    </div>
  )
}
