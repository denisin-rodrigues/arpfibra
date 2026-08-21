"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";

/* Faixa de fotos do Instagram.
   Cada item é um cartão. Para preencher, solte o arquivo em
   public/instagram/ e troque o `src: null` pelo caminho, junto com um `alt`
   que descreva a cena. Slots com src null aparecem como cartão vazio.
   Cinco é o número que fecha o desenho: os das pontas sangram para fora e
   esvanecem, então sobram três inteiros no centro. */
const photos: { src: string | null; alt: string }[] = [
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
  { src: null, alt: "" },
];

/* Posições fixas, e não Math.random(): valores sorteados no render sairiam
   diferentes no servidor e no cliente e quebrariam a hidratação. */
const sparks = [
  { left: "6%", top: "22%" },
  { left: "17%", top: "68%" },
  { left: "29%", top: "14%" },
  { left: "41%", top: "79%" },
  { left: "53%", top: "31%" },
  { left: "66%", top: "72%" },
  { left: "78%", top: "19%" },
  { left: "88%", top: "58%" },
  { left: "95%", top: "35%" },
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
      {/* Poeira luminosa */}
      <div aria-hidden className="absolute inset-0">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-orange/60"
            style={{ left: s.left, top: s.top }}
          />
        ))}
      </div>

      {/* overflow-hidden + justify-center: a fileira é mais larga que a seção,
          então sobra igual dos dois lados e os cartões das pontas ficam
          cortados — é o que dá a sensação de continuar para fora da tela.
          A máscara transforma esse corte seco num esvanecimento, como na
          referência. rgba(0,0,0,0) em vez de `transparent` por consistência
          com o resto do projeto. */}
      <div
        className="relative mb-14 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 13%, #000 87%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 13%, #000 87%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex justify-center gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-sm bg-white/[0.04] ring-1 ring-inset ring-white/10 sm:w-56 lg:w-72"
            >
              {p.src ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 288px, (min-width: 640px) 224px, 176px"
                  className="object-cover"
                />
              ) : (
                /* Cartão vazio à espera da foto. Discreto de propósito: some
                   no fundo escuro em vez de gritar "faltando". */
                <span className="absolute inset-0 grid place-items-center text-white/15">
                  <Icon icon="solar:gallery-wide-linear" className="text-3xl" />
                </span>
              )}
            </div>
          ))}
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
