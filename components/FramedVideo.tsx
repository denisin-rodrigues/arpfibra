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
  const topFade = useRef<HTMLDivElement>(null);

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

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: ".fv-stage",
          },
        });

        tl.to(
          topFade.current,
          { autoAlpha: 0, duration: 0.3, ease: "none" },
          0
        );

        if (isDesktop) {
          /* Os dois cards ladeiam o centro do palco e nascem visíveis juntos,
             saindo de cena conforme a seção avança. */
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

