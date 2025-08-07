// components\common\CardSection.tsx

"use client"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

gsap.registerPlugin(ScrollTrigger);

interface CardSectionProps {
  readonly id: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export default function CardSection({
  id,
  title,
  subtitle,
  className,
  children
}: CardSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const titleElement = titleRef.current;
    const contentElement = contentRef.current;
    const decorativeElement = decorativeRef.current;

    const initialState = { y: 50, opacity: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    if (titleElement) {
      tl.fromTo(titleElement,
        { ...initialState, y: (initialState.y || 0) + 20 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }

    if (decorativeElement) {
      const bars = decorativeElement.querySelectorAll('.decorative-bar');

      tl.fromTo(bars,
        {
          scaleX: 0,
          scaleY: 0,
          opacity: 0,
          rotationZ: -45,
          transformOrigin: "left center"
        },
        {
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          rotationZ: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.08
        },
        "-=0.2"
      )
      .to(bars, {
        scaleX: 1.1,
        scaleY: 0.9,
        duration: 0.15,
        ease: "power2.out",
        stagger: 0.03,
      })
      .to(bars, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.8)",
        stagger: 0.04,
      });

      bars.forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: 1.1,
          duration: 1.5 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });
      });
    }

    if (contentElement) {
      tl.fromTo(contentElement,
        initialState,
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: titleElement ? 0.1 : 0
        },
        titleElement ? "-=0.3" : 0
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative w-full scroll-mt-20",
        "transition-all duration-300 ease-in-out",
        className
      )}
    >
      <Card className={cn(
        "relative overflow-hidden",
        "backdrop-blur-sm bg-card/95",
        "border-border/50 shadow-lg",
        "hover:shadow-xl hover:shadow-primary/5",
        "transition-all duration-300 ease-in-out",
        "hover:border-border/80 gap-4"
      )}>
        <div className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
          "opacity-60"
        )} />

        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse delay-1000" />

        {(title || subtitle) && (
          <CardHeader
            ref={titleRef}
            className={cn(
              "relative z-10",
              "space-y-2"
            )}
          >
            {title && (
              <>
                <CardTitle className={cn(
                  "text-lg sm:text-xl lg:text-2xl font-bold",
                  "bg-gradient-to-r from-primary via-primary/90 to-primary/70",
                  "bg-clip-text text-transparent",
                  "leading-tight tracking-tight"
                )}>
                  {title}
                </CardTitle>

                <div ref={decorativeRef} className="flex items-center gap-3">
                  <div className="decorative-bar decorative-bar-1 h-1.5 w-16 relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-primary/50 bg-[length:200%_100%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.5s]" />
                  </div>
                  <div className="decorative-bar decorative-bar-2 h-1 w-10 relative overflow-hidden rounded-full bg-gradient-to-r from-primary/70 via-primary/50 to-transparent bg-[length:200%_100%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite] [animation-delay:0.3s]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-[shimmer_2.2s_ease-in-out_infinite] [animation-delay:0.8s]" />
                  </div>
                  <div className="decorative-bar decorative-bar-3 h-0.5 w-6 relative overflow-hidden rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent opacity-80 bg-[length:200%_100%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent translate-x-[-100%] animate-[shimmer_2.5s_ease-in-out_infinite] [animation-delay:0.6s]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[shimmer_2.8s_ease-in-out_infinite] [animation-delay:1.1s]" />
                  </div>
                  <div className="decorative-bar decorative-bar-4 h-0.5 w-3 relative overflow-hidden rounded-full bg-gradient-to-r from-primary/40 to-transparent opacity-60 bg-[length:200%_100%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-100%] animate-[shimmer_3s_ease-in-out_infinite] [animation-delay:0.9s]" />
                  </div>
                </div>
              </>
            )}

            {subtitle && (
              <CardDescription className={cn(
                "text-xs sm:text-sm leading-relaxed",
                "text-muted-foreground/90 max-w-2xl",
                "font-medium"
              )}>
                {subtitle}
              </CardDescription>
            )}

            {(title || subtitle) && (
              <Separator className="bg-border/30" />
            )}
          </CardHeader>
        )}

        <CardContent
          ref={contentRef}
          className={cn(
            "relative z-10",
            (title || subtitle) ? "pt-0" : "pt-6"
          )}
        >
          {children}
        </CardContent>
      </Card>
    </section>
  );
}
