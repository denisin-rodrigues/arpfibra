"use client";

import { useEffect, useRef, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

import { prefersReducedMotion as prefersReduced } from "@/lib/motion";

/* ---------------------------------------------------------------
   SplitHeading — revela por palavra, dentro de máscaras.
   Acessibilidade: o container carrega o nome acessível completo
   (aria-label); as palavras animadas são aria-hidden. Sem JS, o
   texto real continua visível (não depende do script).
   --------------------------------------------------------------- */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  start = "top 82%",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const words = el.querySelectorAll<HTMLElement>(".split-word");
    gsap.set(words, { yPercent: 115 });
    const tween = gsap.to(words, {
      yPercent: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.055,
      delay,
      scrollTrigger: { trigger: el, start },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, start]);

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="split-line-mask" aria-hidden="true">
          <span className="split-word">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/* ---------------------------------------------------------------
   Reveal — fade + translate genérico ao entrar na viewport.
   --------------------------------------------------------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  start = "top 85%",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(el, { opacity: 0, y });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay,
      scrollTrigger: { trigger: el, start },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
