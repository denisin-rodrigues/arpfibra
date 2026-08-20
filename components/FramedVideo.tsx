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
  const frameInner = useRef<HTMLDivElement>(null);
  const edgeBlend = useRef<HTMLDivElement>(null);
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

        /* Recorte inicial: um card centralizado que cresce até sangrar a tela.

           No desktop os quatro lados usam a MESMA porcentagem de propósito.
           O elemento é 16:9, então recorte igual em todos os lados devolve
           uma janela também 16:9 — a mesma proporção do vídeo. É isso que
           permite encolher o conteúdo para caber exatamente nela e mostrar
           o quadro inteiro, sem tarja e sem corte. Valores diferentes por
           eixo (como no mobile) recortariam o vídeo. */
        const startInset = isDesktop ? 33 : null;
        const startClip = isDesktop
          ? `inset(${startInset}% ${startInset}% ${startInset}% ${startInset}% round 28px)`
          : "inset(26% 19% 26% 19% round 28px)";
        // Fração visível da janela = 1 - 2 * inset. O conteúdo escala nesse
        // mesmo valor, e como ambos usam o mesmo easing eles ficam em sincronia
        // em todos os pontos do scrub, não só nas pontas.
        const startScale = isDesktop ? 1 - (2 * startInset!) / 100 : 1;

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
        if (isDesktop) {
          tl.fromTo(
            frameInner.current,
            { scale: startScale },
            { scale: 1, ease: "power2.inOut" },
            0
          );
          // O disfarce das laterais só faz sentido quando o vídeo já alcançou
          // as bordas da tela, então entra junto com a expansão.
          tl.fromTo(
            edgeBlend.current,
            { opacity: 0 },
            { opacity: 1, ease: "power2.inOut" },
            0
          );
        }
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
          {/* Wrapper que encolhe junto com a janela do clip-path. Sem ele o
              vídeo ficaria em tamanho real e o recorte mostraria só o miolo,
              cortando as bordas do quadro. Leva o véu escuro junto para o
              gradiente encolher na mesma proporção. */}
          <div ref={frameInner} className="relative h-full w-full">
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

        {/* Disfarce branco nas laterais, no lugar da tarja preta que a máscara
            do vídeo desenhava contra o palco escuro. Fica ancorado no PALCO, e
            não dentro do vídeo: a máscara tem 1618px de largura contra ~1381 de
            tela, então um gradiente preso a ela cairia fora da área visível.
            Entra só conforme o vídeo abre (opacidade animada) — no tamanho de
            card não haveria borda de tela para disfarçar.
            rgba(255,255,255,0) em vez da palavra `transparent`, que o navegador
            interpola em direção ao preto e devolveria a franja escura de volta. */}
        <div
          ref={edgeBlend}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] hidden lg:block"
          style={{
            opacity: 0,
            background:
              "linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 9%, rgba(255,255,255,0) 91%, rgba(255,255,255,0.5) 100%)",
          }}
        />

        {/* Título introdutório. O deslocamento e o painel "liquid glass" ficam
            no filho porque o GSAP controla o transform do elemento com ref. */}
        <div
          ref={intro}
          className="pointer-events-none absolute z-20 w-full max-w-2xl px-5 lg:left-[2.5%] lg:top-1/2 lg:w-[20%] lg:max-w-none lg:-translate-y-1/2 lg:px-0 xl:left-[4%] xl:w-[22%]"
        >
          {/* O painel liquid glass vale nos dois breakpoints: com o palco
              escuro (Hyperspeed), o título ficaria quase da mesma cor do fundo
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

