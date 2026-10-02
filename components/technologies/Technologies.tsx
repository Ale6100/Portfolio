// components\technologies\Technologies.tsx

import tecnologias, { categorias } from '@/content/technologies'
import { cn } from '@/lib/utils'

const ordenarPorNombre = (a: { title: string }, b: { title: string }) =>
  a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })

export default function Technologies() {
  return (
    <dl className="divide-y divide-border/70">
      {categorias.map((categoria) => (
        <div key={categoria} className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]">
          <dt className="pt-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {categoria}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {tecnologias
                .filter((t) => t.categoria === categoria)
                .sort(ordenarPorNombre)
                .map((t) => (
                  <li key={t.title}>
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'group inline-flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5',
                        'text-sm text-foreground/90 shadow-xs',
                        'hover:border-brand/50 hover:text-foreground transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- íconos remotos de varios dominios */}
                      <img
                        src={t.img}
                        alt=""
                        className={cn(
                          'size-4.5 object-contain transition-transform group-hover:scale-110',
                          t.invertirEnOscuro && 'dark:invert'
                        )}
                        loading="lazy"
                      />
                      {t.title}
                    </a>
                  </li>
                ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
