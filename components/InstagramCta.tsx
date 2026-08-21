"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";

/* Faixa de fotos do Instagram.
   Solte os arquivos em public/instagram/ e liste aqui — a faixa some sozinha
   enquanto a lista estiver vazia, para a seção nunca ir ao ar com um vão
   branco no lugar das imagens. A ordem é a de exibição; 4 a 6 fotos
   preenchem bem, porque as das pontas são cortadas de propósito. */
const photos: { src: string; alt: string }[] = [
  // { src: "/instagram/01.jpg", alt: "Equipe ARP em campo" },
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

      {photos.length > 0 && (
        /* overflow-hidden + justify-center: a fileira é mais larga que a
           seção, então sobra igual dos dois lados e as fotos das pontas
           aparecem cortadas — é esse corte que dá a sensação de continuar
           para fora da tela. */
        <div className="relative mb-16 overflow-hidden">
          <div className="flex justify-center gap-4 px-4">
            {photos.map((p, i) => (
              <div
                key={p.src}
                className="relative h-56 w-72 shrink-0 overflow-hidden rounded-sm sm:h-72 sm:w-96"
                /* Desencontro vertical leve para a fileira não virar uma
                   régua reta. */
                style={{ transform: `translateY(${i % 2 === 0 ? 0 : 14}px)` }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 384px, 288px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
