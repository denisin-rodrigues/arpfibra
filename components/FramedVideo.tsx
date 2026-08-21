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
  const topFade = useRef<HTMLDivElement>(null);
  const phoneFrame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

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
        /* Largura do quadro na escala 1. O vídeo é 9:16 nos dois breakpoints.
           Desktop: painel de altura cheia, largura derivada da proporção.
           Mobile: a largura que COBRE a tela — o mesmo cálculo do object-fit
           cover, feito à mão porque aqui quem cresce é a caixa. */
        const panelRatio = 9 / 16;
        const frameWidth = () =>
          isDesktop
            ? stageEl.clientHeight * panelRatio
            : Math.max(stageEl.clientWidth, stageEl.clientHeight * panelRatio);
        // Tamanho do card no início: fração do quadro final.
        const cardWidth = () =>
          isDesktop ? frameWidth() * 0.55 : stageEl.clientWidth * 0.62;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: ".fv-stage",
            // frameWidth() é lido por função: precisa ser recalculado quando
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
          { scale: () => cardWidth() / frameWidth() },
          { scale: 1, ease: "power2.inOut" },
          0
        );
        tl.to(
          topFade.current,
          { autoAlpha: 0, duration: 0.3, ease: "none" },
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
          /* No mobile o vídeo termina cobrindo a tela, então a moldura do
             celular dissolve junto com a expansão — senão o aparelho acabaria
             abraçando as bordas da tela. No desktop o quadro continua sendo um
             painel, e por isso a moldura fica. */
          tl.to(phoneFrame.current, { autoAlpha: 0, duration: 0.5, ease: "none" }, 0);

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

        {/* Véu de transição com a section 1. O Lightfall é claro e quente no
            topo, e a Hero termina em #08080a — sem isto a divisa vira uma
            linha dura. Some conforme a seção entra, então não deixa sombra
            permanente no topo da tela durante o pin. */}
        <div
          ref={topFade}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[26%]"
          style={{
            background:
              "linear-gradient(180deg, #08080a 0%, rgba(8,8,10,0.72) 38%, rgba(8,8,10,0) 100%)",
          }}
        />

        {/* Vídeo da seção, agora um só nos dois breakpoints: a peça é
            retrato (1080x1920) e a composição é vertical — arcos de Wi-Fi
            sobre o globo —, então recortá-la para 16:9 no desktop custaria
            metade do desenho. */}
        <div
          ref={frame}
          /* Ocupa o palco inteiro nos dois breakpoints. No desktop ele deixou
             de ter o tamanho exato do vídeo: era isso que fazia sobrar faixa
             de palco preto nas laterais em telas mais largas que 16:9. */
          className="fv-video-mask absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        >
          {/* A caixa que cresce, sempre 9:16 como o vídeo — é isso que impede
              qualquer corte, já que o `object-cover` não tem o que recortar
              quando caixa e conteúdo têm a mesma proporção.

              Mobile: `max(100%, 56.25svh)` = max(largura, altura × 9/16), a
              largura que faz a caixa COBRIR a tela na escala 1.
              Desktop: altura cheia e largura derivada, virando um painel
              vertical central com o Lightfall aparecendo dos dois lados.
              Cobrir ali exigiria uma caixa de ~2455px de altura, mostrando
              só uma fatia fina do vídeo. */}
          <div
            ref={frameInner}
            className="relative aspect-[9/16] h-auto w-[max(100%,56.25svh)] shrink-0 overflow-hidden rounded-[2rem] lg:h-full lg:w-auto"
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

            {/* Moldura de celular. É uma SOBREPOSIÇÃO desenhada com box-shadow
                inset, e não padding: assim ela não ocupa espaço de layout, o
                vídeo continua preenchendo a caixa inteira e a moldura pode
                sumir sozinha sem deixar borda vazia. As camadas do inset são,
                de dentro para fora, o corpo escuro, um fio de luz simulando o
                brilho do metal, e a lateral do aparelho. */}
            <div
              ref={phoneFrame}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-[2rem]"
              style={{
                boxShadow:
                  "inset 0 0 0 7px #0b0b0e, inset 0 0 0 8px rgba(255,255,255,0.16), inset 0 0 0 13px #17171b, inset 0 0 0 14px rgba(255,255,255,0.06)",
              }}
            >
              {/* Ilha dinâmica. Medidas em %, e não em px, para acompanharem a
                  escala do quadro e manterem a proporção de um aparelho real:
                  ~30% da largura e ~3% da altura. Em px fixos ela encolhia
                  para 12% da largura no painel do desktop. */}
              <span className="absolute left-1/2 top-[2%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0b0e]" />
              {/* Botões laterais */}
              <span className="absolute right-[-1px] top-[22%] h-[9%] w-[3px] rounded-l-sm bg-[#26262c]" />
              <span className="absolute left-[-1px] top-[18%] h-[5%] w-[3px] rounded-r-sm bg-[#26262c]" />
              <span className="absolute left-[-1px] top-[26%] h-[8%] w-[3px] rounded-r-sm bg-[#26262c]" />
            </div>
          </div>
        </div>

        {/* Título introdutório. O deslocamento e o painel "liquid glass" ficam
            no filho porque o GSAP controla o transform do elemento com ref. */}
        <div
          ref={intro}
          className="pointer-events-none absolute z-20 w-full max-w-2xl px-5 lg:left-[2.5%] lg:top-1/2 lg:w-[20%] lg:max-w-none lg:-translate-y-1/2 lg:px-0 xl:left-[4%] xl:w-[22%]"
        >
          {/* Sem painel: o texto assenta direto sobre o Lightfall, em branco.
              O deslocamento -105% segue exclusivo do mobile. */}
          <div className="-translate-y-[105%] px-5 py-6 text-center text-white lg:translate-y-0 lg:px-6 lg:py-7">
            <p className="text-eyebrow mb-3 text-orange lg:mb-4">
              Conecte. Relaxe. A ARP cuida do resto.
            </p>
            <h2 className="fv-title text-section font-bold">
              A melhor internet é aquela que você{" "}
              <span className="text-orange-glow">esquece</span> que está usando.
            </h2>
          </div>
        </div>

        {/* Frases de conforto + CTA. Sem painel, como o card de intro: o texto
            assenta direto sobre o Lightfall, em branco. O "E você? Só
            aproveitando." e o botão seguem laranja. */}
        <div
          ref={overlay}
          className="absolute bottom-0 z-20 w-full max-w-2xl px-5 pb-10 text-center lg:bottom-auto lg:left-auto lg:right-[2.5%] lg:top-1/2 lg:w-[20%] lg:max-w-none lg:-translate-y-1/2 lg:px-0 lg:pb-0 xl:right-[4%] xl:w-[22%]"
          style={{ visibility: "hidden" }}
        >
          <div className="px-5 py-6 lg:px-6 lg:py-7">
            <div className="mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-sm font-medium text-white sm:text-base lg:mb-5 lg:gap-x-3 lg:text-base">
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

