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
    name: "Experiencia",
    href: "#experience",
    icon: Briefcase,
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
    name: "Proyectos",
    href: "#projects",
    icon: FolderOpen,
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
    <nav className="fixed top-0 z-[9999] w-full border-b border-blue-500/30 bg-slate-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/70 shadow-lg shadow-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-cyan-400/15 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          <div className="flex-shrink-0">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-bold text-white hover:text-blue-300 transition-colors duration-200 relative group cursor-pointer"
            >
              <span className="relative z-10">Portfolio</span>
              <span className="text-xs font-normal text-red-400 ml-1 relative z-10">(no terminado)</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-md opacity-0 transition-opacity duration-200 -z-10" />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group",
                    "text-blue-100 text-nowrap hover:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full group-hover:left-0 transition-all duration-200" />
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
                  className="text-blue-100 cursor-pointer hover:text-white hover:bg-blue-500/20"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-96 [&>button:first-of-type]:hidden z-[10000] backdrop-blur-md bg-slate-900/95 border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-cyan-400/15 pointer-events-none" />
                <SheetDescription hidden />
                <div className="flex flex-col space-y-1 mt-8 relative">
                  <div className="flex items-center justify-between mb-4 sm:mb-6 px-4">
                    <SheetTitle className="text-lg font-semibold text-white">Navegación</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-100 cursor-pointer hover:text-white hover:bg-blue-500/20"
                        aria-label="Cerrar menú"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col space-y-1 px-4">

                  {navItems.map(item => {
                    return (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative group",
                            "text-blue-100 text-nowrap hover:text-white",
                            "focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2"
                          )}
                        >
                          <span className="relative z-10">{item.name}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100" />
                          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:w-full group-hover:left-0 transition-all duration-200" />
                        </Link>
                      </SheetClose>
                    )
                  })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
