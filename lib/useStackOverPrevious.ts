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

    /* Terminado o pin, a seção coberta some.

       Sem isso ela reaparece por baixo: com pinSpacing false as duas ocupam o
       MESMO espaço do documento, e quando a de baixo é mais alta que a que
       cobre, a diferença fica sobrando embaixo. Aconteceu aqui — Positioning
       tem 871px contra 662px do Manifesto, e vazavam 248px, o suficiente para
       um card inteiro aparecer depois da faixa laranja.

       Igualar as alturas resolveria, mas amarraria o desenho de uma seção ao
       conteúdo da outra: bastaria alguém escrever mais uma linha para o
       defeito voltar. Apagar não depende de altura nenhuma.

       opacity, e não visibility: visibility hidden tira o trecho da árvore de
       acessibilidade, e o conteúdo continua sendo texto legítimo que um
       leitor de tela percorre linearmente, sem depender de onde a página
       está rolada. */
    /* Guarda o último valor para não reescrever o style a cada quadro: o
       onUpdate abaixo roda a cada rolagem, e atribuir sempre sujaria o CSSOM
       sem necessidade. */
    let visivelAtual: boolean | null = null;
    const mostrar = (visivel: boolean) => {
      if (visivel === visivelAtual) return;
      visivelAtual = visivel;
      prev.style.opacity = visivel ? "" : "0";
    };

    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top bottom",
      end: "top top",
      pin: prev,
      pinSpacing: false,
      anticipatePin: 1,
      onLeave: () => mostrar(false),
      onEnterBack: () => mostrar(true),
      /* Os callbacks acima só disparam ao CRUZAR o limite. Quem chega à
         página já rolado para baixo (link com âncora, recarregar no meio,
         voltar do navegador) nunca cruzaria, e a seção ficaria vazando. O
         refresh acerta o estado pelo progresso atual. */
      onRefresh: (self) => mostrar(self.progress < 1),
      /* Fecha o caso do salto: onLeave e onEnterBack só disparam ao CRUZAR o
         limite rolando, e um link de âncora pula por cima deles. */
      onUpdate: (self) => mostrar(self.progress < 1),
    });

    return () => {
      mostrar(true);
      st.kill();
    };
  }, [ref]);
}
