"use client";

import { useLayoutEffect, useEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Step = {
  title: string;
  desc: string;
};

export function ProcessReveal({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    line.style.transformOrigin = "left center";
    line.style.transform = "scaleX(0)";
    line.style.opacity = "1";
  }, []);

  useEffect(() => {
    const el = ref.current;
    const line = lineRef.current;
    if (!el || !line) return;
    let cancelled = false;

    const stepEls = Array.from(
      el.querySelectorAll("[data-step]")
    ) as HTMLElement[];

    // Set initial state
    stepEls.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = "translateY(12px)";
    });

    Promise.all([
      import("gsap").then((m) => m.gsap),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true,
        },
      });

      // Line draws left → right
      tl.to(line, {
        scaleX: 1,
        duration: 0.85,
        ease: "power3.inOut",
      });

      // Steps cascade in, overlapping with the line
      tl.to(
        stepEls,
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.55,
          ease: "power4.out",
          clearProps: "opacity,transform",
        },
        "-=0.55"
      );
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0"
    >
      {/* Connecting track — animated by GSAP scaleX */}
      <div
        ref={lineRef}
        className="hidden md:block absolute top-[1.375rem] left-[calc(10%+24px)] right-[calc(10%+24px)] h-px bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30"
      />

      {steps.map((step, index) => (
        <div
          key={step.title}
          data-step
          className="relative z-10 flex flex-col items-center text-center px-2"
        >
          <div className="w-11 h-11 rounded-full bg-yellow-400 text-slate-900 font-black text-lg flex items-center justify-center shadow-md shadow-yellow-400/40 mb-4 ring-4 ring-white">
            {index + 1}
          </div>
          <h3 className="font-bold text-slate-900 text-sm leading-snug">
            {step.title}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
            {step.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
