"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { HYPERSPEED_PRESET_FIVE } from "@/lib/hyperspeed-presets";
import { prefersReducedMotion } from "@/lib/motion";

/* Carregado sob demanda: three + postprocessing somam ~700 KB, e nada disso
   precisa estar no bundle inicial nem rodar no servidor (usa WebGL). */
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

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
  const frame = useRef<HTMLDivElement>(null);
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

    // Política central de movimento: ver lib/motion.ts.
    if (prefersReducedMotion()) {
      // O vídeo já sangra a tela pelo CSS, mas as frases de conforto nascem
      // com visibility:hidden e só o GSAP as revela.
      gsap.set(overlay.current, { autoAlpha: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia(sec);

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        // `isMobile` parece redundante com `isDesktop`, mas o gsap.matchMedia
        // só executa o callback quando ALGUMA condição casa. Sem ele, um
        // celular não casaria nada e a seção ficaria sem animação nenhuma.
        isMobile: "(max-width: 1023px)",
      },
      (ctx) => {
        const { isDesktop } = ctx.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
        };

        /* Recorte inicial do vídeo: um card centralizado que cresce até
           sangrar a tela. No desktop o elemento já é um 16:9 da altura do
           palco, então precisa de um recorte lateral maior que no mobile,
           onde ele ocupa a tela inteira em 9:16. */
        const startClip = isDesktop
          ? "inset(23% 33% 23% 33% round 28px)"
          : "inset(26% 19% 26% 19% round 28px)";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: ".fv-stage",
          },
        });

        tl.fromTo(
          frame.current,
          { clipPath: startClip },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" },
          0
        );
        // Intro (título) desliza para fora conforme rola.
        tl.to(intro.current, { autoAlpha: 0, y: -30, ease: "none" }, 0);
        // Frases de conforto surgem quando o vídeo já preencheu a tela.
        tl.fromTo(
          overlay.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: "power2.out" },
          0.55
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-[250vh] bg-bg"
      aria-label="A melhor internet é aquela que você esquece que está usando"
    >
      <div className="fv-stage sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-[#08080a]">
        {/* Fundo da seção: entra no lugar do preenchimento preto chapado.
            O #08080a acima continua como base — cobre o instante antes do
            WebGL subir e casa com o fog preto do próprio efeito. */}
        <div className="absolute inset-0 z-0">
          <Hyperspeed effectOptions={HYPERSPEED_PRESET_FIVE} />
        </div>

        {/* Vídeo como fundo da seção. Duas versões: horizontal (16:9) no
            desktop e vertical (9:16) no mobile. O atributo `media` faz o
            navegador baixar APENAS a fonte correspondente — o vídeo do
            desktop nunca é carregado no celular, e vice-versa. */}
        {/* O wrapper tem o tamanho exato do vídeo no desktop: assim a máscara
            esfuma as bordas reais dele e o véu escuro (que dá contraste ao
            texto) fica restrito ao vídeo, sem invadir as faixas brancas. */}
        <div
          ref={frame}
          /* lg:relative (em vez de lg:static) só para o z-10 valer e o vídeo
             ficar acima do canvas do Hyperspeed; com inset-0 zerado em ambos
             os eixos, `relative` não desloca nada no desktop. */
          className="fv-video-mask absolute inset-0 z-10 lg:relative lg:aspect-video lg:h-full lg:w-auto lg:max-w-none"
        >
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
          {/* O painel liquid glass agora vale nos dois breakpoints. No desktop
              ele era revertido para fundo transparente porque o palco ali era
              branco; com o palco escuro (Hyperspeed) o título ficava quase da
              mesma cor do fundo. Só o deslocamento segue exclusivo do mobile. */}
          <div className="-translate-y-[105%] rounded-[2rem] border border-white/60 bg-white/90 px-5 py-6 text-center shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:translate-x-[40%] lg:translate-y-0 lg:px-10 lg:py-9">
            <p className="text-eyebrow mb-3 text-orange lg:mb-4">
              Conecte. Relaxe. A ARP cuida do resto.
            </p>
            <h2 className="fv-title text-section font-bold">
              A melhor internet é aquela que você{" "}
              <span className="text-orange-glow">esquece</span> que está usando.
            </h2>
          </div>
        </div>

        {/* Frases de conforto + CTA sobre o vídeo de fundo. No mobile ganham
            o mesmo painel liquid glass do card de intro (fonte menor,
            fundo sólido) para legibilidade; no desktop seguem soltas
            sobre o vídeo, com texto branco (já tem scrim escuro por trás). */}
        <div
          ref={overlay}
          className="absolute bottom-0 z-20 w-full max-w-2xl px-5 pb-10 text-center lg:max-w-3xl lg:px-6 lg:pb-16"
          style={{ visibility: "hidden" }}
        >
          <div className="rounded-[2rem] border border-white/60 bg-white/90 px-5 py-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
            <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-sm font-medium text-[#1b1410] sm:text-base lg:mb-6 lg:gap-x-6 lg:text-xl lg:text-white">
              {scenes.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="mb-5 font-display text-lg font-semibold text-orange sm:text-xl lg:mb-8 lg:text-2xl">
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
      </div>
    </section>
  );
}

