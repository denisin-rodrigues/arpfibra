"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

function initialTransform(direction: Direction, distance: string): string {
  switch (direction) {
    case "up":
      return `translateY(${distance})`;
    case "down":
      return `translateY(-${distance})`;
    case "left":
      return `translateX(${distance})`;
    case "right":
      return `translateX(-${distance})`;
    case "none":
    default:
      return "none";
  }
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = "40px",
  className = "",
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    // Conteúdo já visível na primeira dobra (ex.: microbenefícios do Hero,
    // colados na base da viewport) não deve esperar um scroll para revelar:
    // o rootMargin negativo abaixo pode deixá-lo fora da zona de interseção
    // logo no carregamento. Se já estiver na tela, revela na hora.
    const rect = node.getBoundingClientRect();
    const alreadyInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInViewport) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : initialTransform(direction, distance),
    transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      /* will-change promove o elemento a uma camada de composição que o
         navegador MANTÉM enquanto a propriedade existir. A revelação roda uma
         vez só, então a dica é solta ao fim da transição.

         Escrito direto no DOM, e NÃO por estado do React. Com estado, cada um
         dos ~45 ScrollReveal da página re-renderizava ao terminar de animar —
         duas vezes, porque transitionend dispara para opacity e para transform.
         Medido: custava mais CPU do que a memória que economizava.

         O teste de target é porque transitionend borbulha: sem ele, a
         transição de qualquer filho encerraria a dica cedo demais. */
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.style.willChange = "auto";
        }
      }}
    >
      {children}
    </div>
  );
}
