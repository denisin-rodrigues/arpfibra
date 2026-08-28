"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

const reviews = [
  {
    text: "Ótimo atendimento e estabilidade.",
    author: "Cliente ARP",
    image: "/depoimentos/cliente-1.jpg",
  },
  {
    text: "Assisto minhas séries e filmes com ótima conexão.",
    author: "Cliente ARP",
    image: "/depoimentos/cliente-2.jpg",
  },
  {
    text: "O Pedro fica horas no tablet e nunca mais veio reclamar que travou.",
    author: "Mãe do Pedro, cliente ARP",
    image: "/depoimentos/pedro.jpg",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-orange" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} icon="solar:star-bold" className="text-lg" aria-hidden />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    // Topo mais curto que a base e cabeçalho mais justo: é o que sobe o
    // título para abrir espaço vertical ao terceiro depoimento.
    <section className="relative mx-auto max-w-6xl px-5 pb-28 pt-20 sm:pb-36 sm:pt-24">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <Reveal as="p" className="text-eyebrow mb-5 text-orange">
          Quem é ARP, conta.
        </Reveal>
        <SplitHeading as="h2" className="text-section font-bold" text="Conexão se mede em Mega." />
        <SplitHeading
          as="h2"
          className="text-section font-bold text-text-dim"
          text="Confiança se conquista todos os dias."
          delay={0.15}
        />
      </div>

      {/* Três colunas a partir do lg: os depoimentos cabem lado a lado sem
          alongar a seção. Entre md e lg ficam 2 + 1. */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className="border-gradient relative flex flex-col gap-5 rounded-3xl p-8"
          >
            <Icon
              icon="solar:chat-square-2-bold"
              className="absolute right-7 top-7 text-4xl text-orange/15"
              aria-hidden
            />
            <Stars />
            <p className="font-display text-xl font-medium leading-snug sm:text-2xl">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-auto flex items-center gap-3">
              {/* alt vazio: o nome ao lado já identifica a pessoa, então a foto
                  é decorativa e repetir isso só faria barulho no leitor de tela.
                  As fotos são retratos verticais grandes — object-cover recorta
                  pelo centro para caber no círculo sem distorcer. */}
              <Image
                src={r.image}
                alt=""
                width={96}
                height={96}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
              <p className="flex items-center gap-2 text-sm text-text-dim">
                <Icon icon="solar:verified-check-bold" className="text-orange" />
                {r.author}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
