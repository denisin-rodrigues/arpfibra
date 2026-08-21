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
  const topFade = useRef<HTMLDivElement>(null);
  const devices = useRef<HTMLDivElement>(null);
  const earth = useRef<HTMLDivElement>(null);

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
        const stageEl = sec.querySelector<HTMLElement>(".fv-stage")!;

        /* Flutuação contínua dos dispositivos. Amplitude, duração e atraso
           diferentes por item de propósito: em sincronia os dois subiriam e
           desceriam juntos, o que denuncia o laço na hora. yPercent em vez de
           y para a amplitude acompanhar o tamanho do ícone em cada tela. */
        gsap.utils
          .toArray<HTMLElement>(devices.current!.querySelectorAll("img"))
          .forEach((el, i) => {
            gsap.to(el, {
              yPercent: -6 - (i % 3) * 1.5,
              rotation: i % 2 === 0 ? 2.5 : -2.5,
              duration: 3.2 + i * 0.7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.45,
            });
          });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: ".fv-stage",
            // O curso do parallax é lido por função: precisa ser remedido
            // quando o ScrollTrigger recalcula a página.
            invalidateOnRefresh: true,
          },
        });

        tl.to(topFade.current, { autoAlpha: 0, duration: 0.22, ease: "none" }, 0);

        /* Parallax: cada camada sobe num ritmo próprio conforme a seção rola.
           O valor de data-parallax é % da ALTURA DO PALCO, lido por função
           para acompanhar telas diferentes — em yPercent o curso dependeria do
           tamanho de cada peça, e um ícone pequeno mal sairia do lugar.
           O globo leva o maior curso: é ele que sobe. */
        gsap.utils
          .toArray<HTMLElement>(sec.querySelectorAll("[data-parallax]"))
          .forEach((el) => {
            const pct = Number(el.dataset.parallax);
            tl.to(
              el,
              {
                y: () => -(stageEl.clientHeight * pct) / 100,
                // duration 1 = o curso inteiro da seção. Na duração padrão
                // (0.5) a subida terminava em ~41% da rolagem e as camadas
                // ficavam paradas no resto.
                duration: 1,
                ease: "none",
              },
              0
            );
          });

        // Esmaecem só no trecho final, com o parallax já percorrido.
        tl.to(
          [devices.current, earth.current],
          { autoAlpha: 0, duration: 0.18, ease: "none" },
          0.82
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-[250vh] bg-bg"
      aria-label="Conexão para tudo o que você faz"
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

        {/* Horizonte da Terra ancorado na base da seção. z-[12] o deixa acima
            do Lightfall e do véu, mas ABAIXO dos dispositivos (z-[15]) — assim
            eles flutuam sobre o planeta em vez de sumirem atrás dele. A peça
            já tem o topo transparente, então dissolve sozinha no fundo. */}
        <div
          ref={earth}
          data-parallax="48"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[12]"
        >
          <Image
            src="/terra.webp"
            alt=""
            width={1920}
            height={640}
            className="w-full"
          />
        </div>

        {/* Dispositivos 3D, na mesma disposição da peça de referência:
            controle e TV à esquerda, notebook e fone à direita. Os de baixo
            repetem left/right dos de cima para as duas colunas ficarem
            alinhadas. z-[15] os põe acima do véu e do Lightfall. */}
        {/* Aparelhos e mascote. Cada peca tem DOIS elementos de proposito:
           o wrapper recebe o parallax da rolagem e a imagem recebe a
           flutuacao continua. Sao duas animacoes no mesmo eixo — no mesmo
           elemento uma sobrescreveria a outra.

           data-parallax = quanto a camada sobe, em % da altura do palco. Os
           valores crescem do fundo para a frente (Terra 5, aparelhos 18-34,
           mascote 42): e essa diferenca que cria a profundidade. */}
        <div ref={devices} aria-hidden className="pointer-events-none absolute inset-0 z-[15]">
          <div data-parallax="14" className="absolute left-[4%] top-[7%] w-[36%] max-w-[300px] lg:left-[9%] lg:top-[8%] lg:w-[17%]">
            <Image
              src="/icons/controle-3d.png"
              alt=""
              width={620}
              height={413}
              className="w-full -rotate-6"
            />
          </div>
          <div data-parallax="18" className="absolute right-[4%] top-[9%] w-[38%] max-w-[320px] lg:right-[9%] lg:top-[10%] lg:w-[18%]">
            <Image
              src="/icons/notebook-3d.png"
              alt=""
              width={620}
              height={528}
              className="w-full rotate-3"
            />
          </div>
          <div data-parallax="30" className="absolute bottom-[9%] left-[4%] w-[36%] max-w-[300px] lg:bottom-[10%] lg:left-[9%] lg:w-[17%]">
            <Image
              src="/icons/tv-3d.png"
              alt=""
              width={620}
              height={496}
              className="w-full rotate-3"
            />
          </div>
          <div data-parallax="34" className="absolute bottom-[7%] right-[4%] w-[38%] max-w-[320px] lg:bottom-[8%] lg:right-[9%] lg:w-[18%]">
            <Image
              src="/icons/fone-3d.png"
              alt=""
              width={620}
              height={496}
              className="w-full -rotate-6"
            />
          </div>

          {/* Mascote no pico do horizonte. bottom-[26vw] nao e chute: a altura
              do globo e sempre largura/3 e o pico do arco esta a 21,9% do topo
              dessa imagem — 0,781 x largura/3 = 26% da largura acima da base.
              Como so depende da largura, o mesmo valor acerta em qualquer tela.

              59% e o teto no desktop: com os pes a 363px da base sobram 547px
              de altura, que em 3:2 dao 820px de largura. Acima disso a cabeca
              sai da secao. */}
          <div data-parallax="48" className="absolute inset-x-0 bottom-[26vw] mx-auto w-[92%] max-w-[420px] lg:w-[59%] lg:max-w-[820px]">
            <Image
              src="/astronauta.webp"
              alt=""
              width={760}
              height={506}
              className="w-full "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

