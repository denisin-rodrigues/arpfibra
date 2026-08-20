"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const scenes = [
  "Filme rodando.",
  "Videochamada acontecendo.",
  "Celular conectado.",
  "Casa inteira online.",
];

export default function FramedVideo() {
  const section = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  /* O `media` das <source> só é avaliado no carregamento. Ao cruzar o
     breakpoint (girar o tablet, redimensionar), recarregamos para trocar
     entre a versão horizontal e a vertical. */
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const swap = () => el.load();
    mq.addEventListener("change", swap);
    return () => mq.removeEventListener("change", swap);
  }, []);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // Estados finais (definidos no CSS) já bastam.

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: ".fv-stage",
        },
      });

      // Intro (título) desliza para fora conforme rola.
      tl.to(intro.current, { autoAlpha: 0, y: -30, ease: "none" }, 0);
      // Frases de conforto surgem sobre o vídeo de fundo.
      tl.fromTo(
        overlay.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, ease: "power2.out" },
        0.55
      );
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-[250vh] bg-bg"
      aria-label="A melhor internet é aquela que você esquece que está usando"
    >
      <div className="fv-stage sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-[#08080a] lg:bg-white">
        {/* Vídeo como fundo da seção. Duas versões: horizontal (16:9) no
            desktop e vertical (9:16) no mobile. O atributo `media` faz o
            navegador baixar APENAS a fonte correspondente — o vídeo do
            desktop nunca é carregado no celular, e vice-versa. */}
        {/* O wrapper tem o tamanho exato do vídeo no desktop: assim a máscara
            esfuma as bordas reais dele e o véu escuro (que dá contraste ao
            texto) fica restrito ao vídeo, sem invadir as faixas brancas. */}
        <div className="fv-video-mask absolute inset-0 lg:static lg:aspect-video lg:h-full lg:w-auto lg:max-w-none">
          <video
            ref={video}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            <source src="/video-section2.mp4" media="(min-width: 1024px)" type="video/mp4" />
            <source src="/segundovideo.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0) 45%)",
            }}
          />
        </div>

        {/* Título introdutório. O deslocamento e o painel "liquid glass" ficam
            no filho porque o GSAP controla o transform do elemento com ref. */}
        <div
          ref={intro}
          className="pointer-events-none absolute z-20 w-full max-w-2xl px-5"
        >
          <div className="-translate-y-[105%] rounded-[2rem] border border-white/60 bg-white/90 px-5 py-6 text-center shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:translate-y-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <p className="text-eyebrow mb-3 text-orange lg:mb-4">
              Conecte. Relaxe. A ARP cuida do resto.
            </p>
            <h2 className="fv-title text-section font-bold">
              A melhor internet é aquela que você{" "}
              <span className="text-orange-glow">esquece</span> que está usando.
            </h2>
          </div>
        </div>

        {/* Frases de conforto + CTA sobre o vídeo de fundo */}
        <div
          ref={overlay}
          className="text-invert absolute bottom-0 z-20 w-full max-w-3xl px-6 pb-16 text-center"
          style={{ visibility: "hidden" }}
        >
          <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-1 font-display text-xl font-medium text-text sm:text-2xl">
            {scenes.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="mb-8 font-display text-2xl font-semibold text-orange sm:text-3xl">
            E você? Só aproveitando.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary pointer-events-auto"
          >
            <Icon icon="solar:heart-bold" className="text-lg" />
            Quero viver conectado
          </a>
        </div>
      </div>
    </section>
  );
}
