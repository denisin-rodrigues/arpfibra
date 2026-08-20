"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { site } from "@/lib/site";

const micro = ["Fibra óptica", "Planos ilimitados", "Wi-Fi", "Suporte ARP"];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = el.querySelectorAll<HTMLElement>("[data-hero]");
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 30 });
      const tl = gsap.timeline({ delay: 0.25 });
      tl.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="text-invert relative flex min-h-[100svh] flex-col overflow-hidden pt-36 lg:pt-28"
    >
      {/* Fundo quente (visível antes do vídeo carregar) */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_20%,#b8541c_0%,#7a3212_55%,#3a1608_100%)]" />

      {/* Preenchimento: imagem estática pré-borrada (downscale + blur + noise
          via ffmpeg), preenche a tela toda sem emenda. Usar uma imagem em vez
          de desfocar o vídeo ao vivo evita blocos de compressão ampliados
          pelo blur do navegador. */}
      <div
        aria-hidden
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-bg-blurred.webp)" }}
      />

      {/* Vídeo do hero (nítido, travado em 16:9, bordas esfumadas para
          dissolver no fundo borrado — sem linha de emenda). */}
      <div className="absolute inset-0 flex -translate-y-[4%] items-center justify-center lg:translate-y-0">
        <video
          className="hero-video-mask aspect-video h-auto w-full max-w-none scale-[1.5] object-cover lg:h-full lg:w-auto lg:scale-100"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Véu de fumaça — degradês suaves nos cantos, mesclados por cima do
          vídeo (soft-light) para disfarçar qualquer resquício de compressão
          sem esconder o personagem no centro. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          mixBlendMode: "soft-light",
          background:
            "radial-gradient(45% 38% at 12% 15%, rgba(255,170,110,0.55), rgba(255,170,110,0) 70%), radial-gradient(50% 42% at 90% 10%, rgba(90,40,15,0.6), rgba(90,40,15,0) 70%), radial-gradient(55% 48% at 15% 90%, rgba(255,140,80,0.5), rgba(255,140,80,0) 70%), radial-gradient(50% 45% at 88% 88%, rgba(70,30,10,0.55), rgba(70,30,10,0) 70%)",
        }}
      />

      {/* Scrims direcionais */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0) 22%, rgba(8,8,10,0) 45%, rgba(8,8,10,0.55) 72%, rgba(8,8,10,0.96) 100%)",
        }}
      />
      {/* Grão sutil */}
      <div aria-hidden className="grain absolute inset-0" />

      {/* Linhas de referência — enquadram o personagem/círculo, sem cruzar por cima */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Verticais: fora do círculo, altura cheia */}
        <span className="absolute inset-y-0 left-[25%] w-px bg-white/12" />
        <span className="absolute inset-y-0 left-[75%] w-px bg-white/12" />
        {/* Horizontais: acima da cabeça e abaixo do sofá, com vão no meio
            para não cruzar sobre o personagem/círculo */}
        <span
          className="absolute inset-x-0 top-[21%] h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 68%, rgba(255,255,255,0.12) 78%, rgba(255,255,255,0.12) 100%)",
          }}
        />
        <span
          className="absolute inset-x-0 top-[65%] h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 68%, rgba(255,255,255,0.12) 78%, rgba(255,255,255,0.12) 100%)",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-14 sm:pb-16">
        {/* Mobile: título → subtítulo (empurrado para baixo) → CTAs → microbenefícios.
            Desktop (lg+): título e subtítulo lado a lado no topo; microbenefícios
            e CTAs numa segunda "linha" ancorada embaixo, perto dos pés do personagem. */}
        <div className="flex flex-1 flex-col lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-10 lg:gap-y-8">
          {/* HEAD */}
          <div className="mx-auto max-w-sm pt-2 text-center lg:mx-0 lg:max-w-lg lg:-translate-x-[85%]">
            <p
              data-hero
              className="text-eyebrow mb-5 hidden w-fit items-center gap-2 bg-white px-4 py-2 text-orange-deep shadow-[0_4px_16px_-4px_rgba(0,0,0,0.35)] lg:inline-flex lg:mx-auto"
              style={{ fontSize: "0.8rem" }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange" />
              Fibra óptica para o seu dia a dia
            </p>

            <h1 className="text-hero-compact -translate-y-[30%] font-bold lg:translate-y-0">
              <span data-hero className="text-glow">
                Sua vida acontece rápido.
              </span>{" "}
              <span data-hero className="text-text-dim">
                Sua internet também deveria.
              </span>
            </h1>
          </div>

          {/* SUBHEAD — no mobile, mt-auto empurra ela (e tudo que vem depois,
              já que seguem logo abaixo no fluxo) para perto da base; no
              desktop fica ao lado do título. */}
          <p
            data-hero
            className="mx-auto mt-auto max-w-[24rem] text-center text-base leading-relaxed text-text-dim lg:mx-0 lg:mt-0 lg:translate-x-[79%] lg:text-xl"
          >
            Trabalhe, estude, jogue, assista e conecte todos os seus
            dispositivos com uma internet preparada para acompanhar o seu ritmo.
          </p>

          {/* Base: CTAs + microbenefícios, com mais respiro interno.
              No mobile ficam nessa ordem; no desktop invertem
              (microbenefícios em cima) via flex-col-reverse. */}
          <div className="mt-8 flex flex-col items-center gap-7 pb-2 lg:mt-auto lg:w-full lg:flex-col-reverse lg:gap-6 lg:pb-0">
            <div data-hero className="flex flex-row items-center justify-center gap-2 sm:gap-3">
              <a href="#combos" className="btn btn-sm btn-primary btn-shine rounded-lg">
                <Icon icon="solar:widget-5-bold" className="text-base sm:text-lg" />
                Ver combos
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-white rounded-lg"
              >
                <Icon icon="solar:chat-round-call-bold" className="text-lg" />
                Falar com a ARP
              </a>
            </div>

            <ul
              data-hero
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base text-text-faint"
            >
              {micro.map((m, i) => (
                <li key={m} className="flex items-center gap-5">
                  {i > 0 && <span className="text-orange/50">•</span>}
                  <span className="flex items-center gap-1.5">
                    <Icon icon="solar:check-circle-bold" className="text-orange" />
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Indicador de scroll (reforça o gesto do personagem) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-5 z-10 flex justify-center"
      >
        <span className="animate-bounce text-text-faint">
          <Icon icon="solar:double-alt-arrow-down-linear" className="text-2xl" />
        </span>
      </div>
    </section>
  );
}
