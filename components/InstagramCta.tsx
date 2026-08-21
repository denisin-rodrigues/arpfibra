"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";

/* Faixa de fotos do Instagram. Para trocar ou acrescentar, solte o arquivo em
   public/instagram/ e some uma entrada aqui — o carrossel se ajusta sozinho ao
   tamanho da lista. O `alt` descreve a cena porque essas fotos são conteúdo,
   e não decoração. */
const photos: { src: string; alt: string }[] = [
  { src: "/instagram/01.webp", alt: "Cliente recebendo TV em sorteio da ARP Fibra" },
  { src: "/instagram/02.webp", alt: "Equipe ARP Fibra em evento esportivo patrocinado" },
  { src: "/instagram/03.webp", alt: "Convidados no estúdio do arpcast" },
  { src: "/instagram/04.webp", alt: "Equipe ARP Fibra no estúdio" },
  { src: "/instagram/05.webp", alt: "Time reunido no painel do arpcast" },
];

/* Brasas subindo. Os valores foram sorteados uma vez por um gerador com
   semente e gravados aqui como literais — Math.random() no render daria
   números diferentes no servidor e no cliente e quebraria a hidratação.

   `delay` é NEGATIVO de propósito: um atraso negativo não espera, ele começa
   a animação já adiantada nesse tanto. Sem isso as 26 brasas acenderiam
   juntas no carregamento e pulsariam em bloco, como um organismo só. */
const sparks = [
  { left: "79.9%", top: "43.4%", size: 4, rise: 150, drift: 18, dur: 8.6, delay: -8.5, opacity: 0.85 },
  { left: "8.3%", top: "18.1%", size: 3, rise: 172, drift: 18, dur: 14.6, delay: -3.4, opacity: 0.52 },
  { left: "26.4%", top: "20.1%", size: 5, rise: 257, drift: -21, dur: 9.3, delay: -5.2, opacity: 0.31 },
  { left: "75.5%", top: "15.1%", size: 3, rise: 273, drift: 26, dur: 12.3, delay: -2.2, opacity: 0.74 },
  { left: "26.1%", top: "30.2%", size: 4, rise: 326, drift: 25, dur: 12.8, delay: -1.2, opacity: 0.67 },
  { left: "51.5%", top: "83.1%", size: 4, rise: 308, drift: -12, dur: 10.8, delay: -9.7, opacity: 0.64 },
  { left: "89.3%", top: "14.5%", size: 4, rise: 142, drift: -3, dur: 9.4, delay: -2, opacity: 0.55 },
  { left: "80.5%", top: "29.1%", size: 2, rise: 321, drift: -2, dur: 12.8, delay: -2.7, opacity: 0.52 },
  { left: "21.7%", top: "36.5%", size: 3, rise: 308, drift: -17, dur: 14.1, delay: -9.6, opacity: 0.49 },
  { left: "70.4%", top: "35.1%", size: 2, rise: 269, drift: 16, dur: 8.6, delay: -7.9, opacity: 0.82 },
  { left: "5.9%", top: "11.6%", size: 3, rise: 174, drift: -26, dur: 14.3, delay: -5.1, opacity: 0.67 },
  { left: "46.6%", top: "94.5%", size: 5, rise: 214, drift: 21, dur: 9.6, delay: -7.5, opacity: 0.77 },
  { left: "60.1%", top: "26.1%", size: 4, rise: 266, drift: 25, dur: 13.4, delay: -10.7, opacity: 0.79 },
  { left: "81.5%", top: "48.7%", size: 4, rise: 151, drift: -4, dur: 10.3, delay: -4.1, opacity: 0.57 },
  { left: "92.5%", top: "32.7%", size: 3, rise: 329, drift: 19, dur: 8.4, delay: -3.9, opacity: 0.38 },
  { left: "50.1%", top: "77.8%", size: 5, rise: 175, drift: 12, dur: 10, delay: -1.8, opacity: 0.4 },
  { left: "46.8%", top: "28%", size: 2, rise: 320, drift: 3, dur: 8.9, delay: -8.8, opacity: 0.48 },
  { left: "29.2%", top: "73.9%", size: 4, rise: 299, drift: 1, dur: 9.2, delay: -8.8, opacity: 0.83 },
  { left: "92.5%", top: "20%", size: 3, rise: 213, drift: -7, dur: 9.4, delay: -8.7, opacity: 0.61 },
  { left: "76.6%", top: "27.5%", size: 2, rise: 339, drift: 4, dur: 14.1, delay: -13.5, opacity: 0.74 },
  { left: "69.8%", top: "85.5%", size: 4, rise: 211, drift: 7, dur: 9.2, delay: -7.4, opacity: 0.58 },
  { left: "57.5%", top: "56.1%", size: 3, rise: 246, drift: 4, dur: 14.7, delay: -7.1, opacity: 0.41 },
  { left: "55%", top: "74.9%", size: 3, rise: 196, drift: -3, dur: 7.5, delay: -4.1, opacity: 0.33 },
  { left: "79.2%", top: "16.9%", size: 3, rise: 278, drift: 19, dur: 13.6, delay: -0.4, opacity: 0.72 },
  { left: "51.6%", top: "22.8%", size: 4, rise: 156, drift: 9, dur: 7.5, delay: -3.2, opacity: 0.82 },
  { left: "30.6%", top: "82.2%", size: 4, rise: 242, drift: 12, dur: 11.7, delay: -9.3, opacity: 0.72 },
];
export default function InstagramCta() {
  return (
    <section
      aria-labelledby="instagram-cta-title"
      className="relative overflow-hidden bg-[#0b0a0c] py-24 sm:py-32"
    >
      {/* Brilho de marca subindo do centro */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 45%, rgba(255,90,30,0.20) 0%, rgba(255,90,30,0) 70%)",
        }}
      />
      {/* Poeira luminosa subindo, como brasa. Fica atrás da faixa de fotos
          (vem antes no DOM e nenhuma das duas tem z-index): as brasas passam
          por trás dos cartões e reaparecem acima, o que dá profundidade em
          vez de sujeira por cima das fotos. */}
      <div aria-hidden className="absolute inset-0">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="ig-ember"
            style={
              {
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
                "--ig-rise": `${s.rise}px`,
                "--ig-drift": `${s.drift}px`,
                "--ig-peak": s.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Trilho do carrossel. O overflow-hidden corta a fileira, que é bem
          mais larga que a seção, e a máscara transforma esse corte seco num
          esvanecimento nas duas pontas — as fotos surgem e somem em vez de
          aparecerem do nada na borda. rgba(0,0,0,0) em vez de `transparent`
          por consistência com o resto do projeto. */}
      <div
        className="relative mb-14 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 13%, #000 87%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 13%, #000 87%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Sem `gap`, e com o respiro como margem à direita de CADA cartão:
            com gap a fileira mede 10L + 9E, e -50% pararia meio espaçamento
            antes do 6º cartão — um pulinho visível a cada volta. Com margem
            em todos, a fileira mede 10(L+E) e a metade cai exatamente no
            início da cópia. */}
        <div className="ig-marquee flex w-max">
          {[...photos, ...photos].map((p, i) => {
            /* A segunda metade é só a emenda do laço: mesma foto, já descrita
               na primeira. aria-hidden para o leitor de tela não repetir. */
            const dup = i >= photos.length;
            return (
            <div
              key={i}
              aria-hidden={dup || undefined}
              className="relative mr-3 aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-sm bg-white/[0.04] ring-1 ring-inset ring-white/10 sm:mr-4 sm:w-56 lg:w-72"
            >
              <Image
                src={p.src}
                alt={dup ? "" : p.alt}
                fill
                sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 176px"
                className="object-cover"
              />
            </div>
            );
          })}
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <ScrollReveal direction="up">
          <h2
            id="instagram-cta-title"
            className="font-display text-3xl font-bold text-white sm:text-4xl"
          >
            O dia a dia da ARP está lá.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/70">
            Bastidores, novidades e a equipe que mantém Mambaí conectada.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_40px_-10px_rgba(255,90,30,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Visite nosso Instagram
            <Icon icon="solar:alt-arrow-right-linear" className="text-lg" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
