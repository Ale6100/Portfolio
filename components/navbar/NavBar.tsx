// components\navbar\NavBar.tsx

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

const navItems = [
  { name: "Sobre mí", href: "#about" },
  { name: "Experiencia", href: "#experience" },
  { name: "Tecnologías", href: "#technologies" },
  { name: "Educación", href: "#education" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
]

function useActiveSection() {
  const [ activeHref, setActiveHref ] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["#top", ...navItems.map(item => item.href)]
      .map(href => document.querySelector(href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveHref(visible.target.id === "top" ? null : `#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeHref;
}

export default function NavBar() {
  const [ isOpen, setIsOpen ] = useState(false);
  const activeHref = useActiveSection();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6" aria-label="Principal">
        <Link
          href="#top"
          className="font-mono text-sm font-medium tracking-tight hover:text-brand transition-colors"
        >
          alejandro<span className="text-brand">.</span>portaluppi
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden md:flex items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={activeHref === item.href ? "true" : undefined}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    "text-muted-foreground hover:text-foreground",
                    "aria-[current]:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden cursor-pointer"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="px-6 pt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Navegación</SheetTitle>
              <SheetDescription hidden />
              <nav aria-label="Principal">
                <ul className="flex flex-col px-3">
                  {navItems.map(item => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={activeHref === item.href ? "true" : undefined}
                          className="block rounded-md px-3 py-2.5 text-base text-muted-foreground hover:bg-muted hover:text-foreground aria-[current]:text-foreground transition-colors"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
