"use client";

import { useLayoutEffect, useEffect, useRef, type ReactNode } from "react";

// Avoids the React SSR warning — layout effect only runs in browser
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger-animate direct children instead of the wrapper itself */
  stagger?: boolean;
  /** Additional delay in seconds before animation fires */
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  stagger = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Set initial hidden state before first paint — prevents flash of visible content
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = (
      stagger ? Array.from(el.children) : [el]
    ) as HTMLElement[];

    // Only hide elements that are below the viewport fold
    const rect = el.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.88) {
      targets.forEach((t) => {
        t.style.opacity = "0";
        t.style.transform = "translateY(14px)";
      });
    }
  }, [stagger]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = (
      stagger ? Array.from(el.children) : [el]
    ) as HTMLElement[];
    let cancelled = false;

    Promise.all([
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        stagger: stagger ? 0.075 : 0,
        duration: 0.65,
        delay,
        ease: "power4.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
