"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Empilhamento: a seção anterior para no lugar e a seção passada por `ref`
 * desliza por cima dela, terminando quando cobre a tela.
 *
 * `pinSpacing: false` é o que produz a sobreposição. Com o espaçamento padrão
 * o ScrollTrigger reserva altura de rolagem equivalente ao pin, e as duas
 * seções continuariam lado a lado — apenas com a anterior congelada.
 *
 * O intervalo vai de "topo desta seção na base da tela" até "topo desta seção
 * no topo da tela": começa exatamente quando a anterior termina de entrar em
 * cena e acaba quando esta a cobre por completo.
 *
 * A seção que usa este hook precisa de fundo OPACO (senão a de baixo aparece
 * através) e de um z-index explícito: durante o pin a anterior vira
 * `position: fixed`, e sem z a ordem de pintura passaria a depender só da
 * ordem no DOM.
 */
export function useStackOverPrevious(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sec = ref.current;
    if (!sec || prefersReducedMotion()) return;

    /* A seção coberta é a irmã imediatamente anterior no fluxo da página.
       Depois de um pin, porém, o ScrollTrigger embrulha o alvo num
       `.pin-spacer` — que passa a ser a irmã anterior. Numa remontagem do
       componente (Fast Refresh, StrictMode) prenderíamos o embrulho em vez da
       seção, então desembrulhamos antes. */
    const sibling = sec.previousElementSibling as HTMLElement | null;
    if (!sibling) return;
    const prev = sibling.classList.contains("pin-spacer")
      ? (sibling.firstElementChild as HTMLElement | null)
      : sibling;
    if (!prev) return;

    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top bottom",
      end: "top top",
      pin: prev,
      pinSpacing: false,
      anticipatePin: 1,
    });

    return () => st.kill();
  }, [ref]);
}
