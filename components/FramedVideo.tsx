"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { LIGHTFALL_SECTION2 } from "@/lib/lightfall-preset";
import { prefersReducedMotion } from "@/lib/motion";

/* Carregado sob demanda: precisa de WebGL, então não pode rodar no servidor,
   e manter o ogl fora do bundle inicial adianta a primeira renderização. */
const Lightfall = dynamic(() => import("./Lightfall"), { ssr: false });

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
  const frameInner = useRef<HTMLDivElement>(null);
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

        const stageEl = sec.querySelector<HTMLElement>(".fv-stage")!;
        /* Largura que o quadro 16:9 precisa ter para COBRIR o palco. Numa tela
           mais larga que 16:9 quem manda é a largura; numa mais alta, a altura.
           É o mesmo cálculo do `object-fit: cover`, feito à mão porque aqui
           quem cresce é a caixa, não o conteúdo dentro dela. */
        const ratio = isDesktop ? 16 / 9 : 9 / 16;
        const coverWidth = () =>
          Math.max(stageEl.clientWidth, stageEl.clientHeight * ratio);
        // No mobile o card e proporcional a tela; 550px nao caberia em 375.
        const cardWidth = () =>
          isDesktop ? 550 : stageEl.clientWidth * 0.62;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: ".fv-stage",
            // coverWidth() é lido por função: precisa ser recalculado quando
            // o ScrollTrigger remede a página (resize, fontes carregando).
            invalidateOnRefresh: true,
          },
        });

        /* A caixa tem a proporção do vídeo do breakpoint e já vem dimensionada
           para cobrir o palco; escalá-la até 1 faz o vídeo sangrar a tela sem
           sobrar faixa de palco. Como caixa e vídeo têm a mesma proporção, o
           quadro aparece INTEIRO em qualquer ponto da escala — era o recorte
           por clip-path que cortava as laterais no mobile. */
        tl.fromTo(
          frameInner.current,
          { scale: () => cardWidth() / coverWidth() },
          { scale: 1, ease: "power2.inOut" },
          0
        );

        if (isDesktop) {
          /* Os dois cards ladeiam o frame do vídeo e nascem visíveis juntos.
             Saem de cena junto com o crescimento do vídeo — é isso que impede
             que acabem por cima dele quando ele passa a sangrar a tela. */
          gsap.set(overlay.current, { autoAlpha: 1, y: 0 });
          tl.to(
            [intro.current, overlay.current],
            { autoAlpha: 0, y: -30, ease: "none" },
            0
          );
        } else {
          // Mobile: sequência original — intro sai, frases entram depois.
          tl.to(intro.current, { autoAlpha: 0, y: -30, ease: "none" }, 0);
          tl.fromTo(
            overlay.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, ease: "power2.out" },
            0.55
          );
        }
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
          <Lightfall {...LIGHTFALL_SECTION2} />
        </div>

        {/* Vídeo como fundo da seção. Duas versões: horizontal (16:9) no
            desktop e vertical (9:16) no mobile. O atributo `media` faz o
            navegador baixar APENAS a fonte correspondente — o vídeo do
            desktop nunca é carregado no celular, e vice-versa. */}
        <div
          ref={frame}
          /* Ocupa o palco inteiro nos dois breakpoints. No desktop ele deixou
             de ter o tamanho exato do vídeo: era isso que fazia sobrar faixa
             de palco preto nas laterais em telas mais largas que 16:9. */
          className="fv-video-mask absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        >
          {/* Esta é a caixa que cresce. Ela tem a proporção do vídeo do
              breakpoint — 9:16 no mobile, 16:9 no desktop — e é por isso que o
              quadro nunca aparece cortado: o `object-cover` do vídeo não tem o
              que recortar quando caixa e conteúdo têm a mesma proporção.
              A largura `max(100%, 56.25svh)` / `max(100%, 177.8svh)` é o mesmo
              max(largura, altura × proporção) calculado no JS, para a caixa
              cobrir o palco quando a escala chega a 1. Arredondamento e
              overflow ficam aqui — dispensam o clip-path. */}
          <div
            ref={frameInner}
            className="relative aspect-[9/16] h-auto w-[max(100%,56.25svh)] shrink-0 overflow-hidden rounded-[2rem] lg:aspect-video lg:w-[max(100%,177.8svh)]"
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
        </div>

        {/* Título introdutório. O deslocamento e o painel "liquid glass" ficam
            no filho porque o GSAP controla o transform do elemento com ref. */}
        <div
          ref={intro}
          className="pointer-events-none absolute z-20 w-full max-w-2xl px-5 lg:left-[2.5%] lg:top-1/2 lg:w-[20%] lg:max-w-none lg:-translate-y-1/2 lg:px-0 xl:left-[4%] xl:w-[22%]"
        >
          {/* O painel liquid glass vale nos dois breakpoints: com o palco
              escuro (Lightfall), o título ficaria quase da mesma cor do fundo
              sem ele. O deslocamento -105% segue exclusivo do mobile. */}
          <div className="-translate-y-[105%] rounded-[2rem] border border-white/60 bg-white/90 px-5 py-6 text-center shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:translate-y-0 lg:px-6 lg:py-7">
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
          className="absolute bottom-0 z-20 w-full max-w-2xl px-5 pb-10 text-center lg:bottom-auto lg:left-auto lg:right-[2.5%] lg:top-1/2 lg:w-[20%] lg:max-w-none lg:-translate-y-1/2 lg:px-0 lg:pb-0 xl:right-[4%] xl:w-[22%]"
          style={{ visibility: "hidden" }}
        >
          <div className="rounded-[2rem] border border-white/60 bg-white/90 px-5 py-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:px-6 lg:py-7">
            <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-sm font-medium text-[#1b1410] sm:text-base lg:mb-5 lg:gap-x-3 lg:text-base">
              {scenes.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="mb-5 font-display text-lg font-semibold text-orange sm:text-xl lg:mb-6 lg:text-lg">
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

