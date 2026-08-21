"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIGHTFALL_SECTION2 } from "@/lib/lightfall-preset";
import { prefersReducedMotion } from "@/lib/motion";
import Globe from "./Globe";

/* Carregado sob demanda: precisa de WebGL, então não pode rodar no servidor,
   e manter o ogl fora do bundle inicial adianta a primeira renderização. */
const Lightfall = dynamic(() => import("./Lightfall"), { ssr: false });

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Uma frase para cada aparelho que aparece na cena: controle, TV, notebook
   e fone. Trocam a cada 3s exatos (0,7 entra + 1,6 segura + 0,7 sai). */
const frases = [
  "Melhor conexão para games",
  "Streaming sem travar",
  "Home office sem quedas",
  "Música o dia inteiro",
];

export default function FramedVideo() {
  const section = useRef<HTMLDivElement>(null);
  const topFade = useRef<HTMLDivElement>(null);
  const devices = useRef<HTMLDivElement>(null);
  const earth = useRef<HTMLDivElement>(null);
  const bgText = useRef<HTMLDivElement>(null);

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

        /* Rodízio das frases. Cada uma leva 3s exatos: 0,7 entrando, 1,6
           parada, 0,7 saindo. Timeline própria com repeat -1 — é um laço de
           tempo, independente da rolagem, ao contrário do resto da seção. */
        const frasesEls = gsap.utils.toArray<HTMLElement>(
          bgText.current!.children
        );
        gsap.set(frasesEls, { autoAlpha: 0, yPercent: 40 });
        const rodizio = gsap.timeline({ repeat: -1 });
        frasesEls.forEach((el) => {
          rodizio
            .to(el, { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "power3.out" })
            .to(
              el,
              { autoAlpha: 0, yPercent: -40, duration: 0.7, ease: "power3.in" },
              "+=1.6"
            );
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
          [devices.current, earth.current, bgText.current],
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

        {/* Texto de fundo. z-[8] o deixa acima do Lightfall e do véu, mas
            atrás do globo (12) e dos aparelhos (15) — é pano de fundo, não
            conteúdo. As frases ficam empilhadas no mesmo ponto e só uma
            aparece por vez. data-parallax baixo: deriva devagar, o que
            reforça a sensação de estar lá no fundo.

            O pb sobe o texto encurtando a área de centralização, em vez de um
            translate: o GSAP já anima `y` neste elemento e nos spans, e um
            translate do Tailwind entraria em conflito. A unidade é vh, e não
            %, porque padding percentual resolve contra a LARGURA do bloco —
            em % o deslocamento mudava conforme a proporção da tela. */}
        <div
          ref={bgText}
          data-parallax="8"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[8] grid place-items-center px-6 pb-[22vh]"
        >
          {frases.map((f) => (
            <span
              key={f}
              className="col-start-1 row-start-1 text-center font-display text-[clamp(1.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-white/[0.45]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Globo. Segue com data-parallax="48" — continua sendo a camada que
            sobe mais, que era o ponto do efeito. Diametro em vh para o
            enquadramento nao depender da largura da tela, e ancorado embaixo
            para o mascote poder pousar sobre ele. z-[12]: acima do Lightfall
            e do veu, abaixo dos aparelhos. */}
        <div
          ref={earth}
          data-parallax="48"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[6%] z-[12] flex justify-center"
        >
          <Globe className="h-[46vh] w-[46vh] shrink-0" />
        </div>

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

          {/* Mascote pousado sobre o globo. bottom-[50vh] vem da geometria da
              esfera: 46vh de diametro a 6% da base coloca o topo dela por
              volta de 52vh, entao os pes entram uns poucos px na curvatura —
              e o que faz parecer pouso, e nao flutuacao solta. Esfera e
              mascote usam a mesma unidade (vh), entao a relacao se mantem em
              qualquer tela. */}
          <div data-parallax="48" className="absolute inset-x-0 bottom-[50vh] mx-auto w-[60%] max-w-[300px] lg:w-[34%] lg:max-w-[470px]">
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

