"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHTFALL_SECTION2 } from "@/lib/lightfall-preset";
import { prefersReducedMotion } from "@/lib/motion";

/* Carregado sob demanda: precisa de WebGL, então não pode rodar no servidor,
   e manter o ogl fora do bundle inicial adianta a primeira renderização. */
const Lightfall = dynamic(() => import("./Lightfall"), { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FramedVideo() {
  const section = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const topFade = useRef<HTMLDivElement>(null);
  const devices = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;

    // Política central de movimento: ver lib/motion.ts.
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia(sec);

    mm.add(
      {
        /* As duas condições cobrem toda a faixa de larguras de propósito: o
           gsap.matchMedia só executa o callback quando ALGUMA delas casa, e
           sem a de mobile um celular não casaria nada — a seção ficaria sem
           animação nenhuma. */
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      () => {
        /* Flutuação contínua dos dispositivos. Amplitude, duração e atraso
           diferentes por item de propósito: em sincronia os dois subiriam e
           desceriam juntos, o que denuncia o laço na hora. yPercent em vez de
           y para a amplitude acompanhar o tamanho do ícone em cada tela. */
        gsap.utils
          .toArray<HTMLElement>(devices.current!.children)
          .forEach((el, i) => {
            gsap.to(el, {
              yPercent: i === 0 ? -7 : -9,
              rotation: i === 0 ? 2.5 : -2.5,
              duration: 3.4 + i * 0.9,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.6,
            });
          });

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

        // Texto e dispositivos saem de cena conforme a seção avança.
        tl.to(
          [intro.current, devices.current],
          { autoAlpha: 0, y: -30, ease: "none" },
          0
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

        {/* Dispositivos 3D, na disposição da peça de referência: controle à
            esquerda, notebook à direita. Ficam na faixa superior porque as
            duas colunas de texto são centradas na vertical — no desktop elas
            ocupam a altura do meio, e no mobile o intro e as frases tomam de
            40% para baixo, então a faixa de cima é o espaço que sobra.
            z-[15]: acima do véu e do Lightfall, abaixo do texto. */}
        <div ref={devices} aria-hidden className="pointer-events-none absolute inset-0 z-[15]">
          <Image
            src="/icons/controle-3d.png"
            alt=""
            width={620}
            height={413}
            className="absolute left-[4%] top-[7%] w-[36%] max-w-[300px] -rotate-6 lg:left-[9%] lg:top-[8%] lg:w-[17%]"
          />
          <Image
            src="/icons/notebook-3d.png"
            alt=""
            width={620}
            height={528}
            className="absolute right-[4%] top-[9%] w-[38%] max-w-[320px] rotate-3 lg:right-[9%] lg:top-[10%] lg:w-[18%]"
          />
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

      </div>
    </section>
  );
}

