// components\navbar\NavBar.tsx

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, User, FolderOpen, Code, GraduationCap, Briefcase, Mail } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import Link from "next/link"

const navItems = [
  {
    name: "Sobre mí",
    href: "#about",
    icon: User,
  },
  {
    name: "Proyectos",
    href: "#projects",
    icon: FolderOpen,
  },
  {
    name: "Tecnologías",
    href: "#technologies",
    icon: Code,
  },
  {
    name: "Estudios",
    href: "#education",
    icon: GraduationCap,
  },
  {
    name: "Experiencia",
    href: "#experience",
    icon: Briefcase,
  },
  {
    name: "Contacto",
    href: "#contact",
    icon: Mail,
  },
]

export default function NavBar() {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="#home"
              className="text-xl font-bold text-foreground hover:text-gray-700 transition-colors duration-200"
            >
              Portfolio <span className="text-xs font-normal text-red-700">(no terminado)</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    "text-muted-foreground text-nowrap hover:text-foreground hover:bg-accent",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground cursor-pointer hover:text-foreground"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-96 [&>button:first-of-type]:hidden">
                <SheetDescription hidden />
                <div className="flex flex-col space-y-2 sm:space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6 px-4">
                    <SheetTitle className="text-lg font-semibold">Navegación</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground cursor-pointer hover:text-foreground"
                        aria-label="Cerrar menú"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  {navItems.map(item => {
                    const Icon = item.icon
                    return (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg",
                            "text-muted-foreground hover:text-foreground hover:bg-accent",
                            "transition-all duration-200 group"
                          )}
                        >
                          <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium text-base">{item.name}</span>
                        </Link>
                      </SheetClose>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
