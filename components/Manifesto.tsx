"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const line1 = "Você não deveria precisar pensar na sua internet.";
const line2 = "Ela deveria simplesmente funcionar.";
const full = `${line1} ${line2}`;

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const words = el.querySelectorAll<HTMLElement>(".mf-word");
    if (reduce) {
      gsap.set(words, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  /* Empilhamento: a seção anterior para no lugar e esta desliza por cima dela.

     `pinSpacing: false` é o que produz a sobreposição — com o espaçamento
     padrão o ScrollTrigger reservaria altura equivalente ao pin e as duas
     continuariam lado a lado, só que com a anterior parada.

     O intervalo vai de "topo desta seção na base da tela" até "topo desta
     seção no topo da tela": começa exatamente quando a anterior termina de
     entrar em cena e acaba quando esta a cobre por completo. */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec || prefersReducedMotion()) return;

    /* A seção coberta é a irmã imediatamente anterior no fluxo da página.
       Depois de um pin, porém, o ScrollTrigger embrulha o alvo num
       `.pin-spacer` — que passa a ser a irmã anterior. Numa remontagem do
       componente (Fast Refresh, StrictMode) prenderíamos o embrulho em vez
       da seção, então desembrulhamos antes. */
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
  }, []);

  return (
    <section
      ref={sectionRef}
      /* z-10: durante o pin a seção anterior vira `position: fixed`, e sem um
         z explícito a ordem de pintura entre as duas passa a depender só da
         ordem no DOM. */
      className="section-orange notch-top relative z-10 overflow-hidden pb-32 pt-40 sm:pb-44 sm:pt-52"
    >
      {/* Feixe de luz de fibra ao fundo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[1px] w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-6 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0))",
        }}
      />
      <div ref={ref} className="mx-auto max-w-4xl px-6 text-center">
        <p
          className="font-display text-3xl font-semibold leading-[1.15] sm:text-5xl"
          aria-label={full}
        >
          {full.split(" ").map((w, i) => (
            <span key={i} className="mf-word inline-block" aria-hidden="true">
              {w}
              {i < full.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div className="mt-14">
          <p className="font-display text-xl font-bold tracking-tight text-white">
            ARP Fibra
          </p>
          <p className="mt-1 text-text-dim">
            Sua conexão para tudo o que importa.
          </p>
        </div>
      </div>
    </section>
  );
}
