"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

const reviews = [
  { text: "Ótimo atendimento e estabilidade.", author: "Cliente ARP" },
  {
    text: "Assisto minhas séries e filmes com ótima conexão.",
    author: "Cliente ARP",
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
    <section className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div className="mb-14 max-w-2xl">
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

      <div className="grid gap-5 md:grid-cols-2">
        {reviews.map((r, i) => (
          <Reveal
            key={i}
            delay={i * 0.1}
            className="border-gradient relative flex flex-col gap-5 rounded-3xl p-8"
          >
            <Icon
              icon="solar:quote-up-bold"
              className="absolute right-7 top-7 text-4xl text-orange/15"
              aria-hidden
            />
            <Stars />
            <p className="font-display text-xl font-medium leading-snug sm:text-2xl">
              &ldquo;{r.text}&rdquo;
            </p>
            <p className="mt-auto flex items-center gap-2 text-sm text-text-dim">
              <Icon icon="solar:verified-check-bold" className="text-orange" />
              {r.author}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
