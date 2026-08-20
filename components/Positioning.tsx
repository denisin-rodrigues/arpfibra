"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

const reasons = [
  "É trabalho que não pode parar.",
  "É aula que não pode travar.",
  "É filme sem interrupção.",
  "É estar perto, mesmo estando longe.",
];

type Card = {
  image: string;
  title: string;
  text: string;
};

const cards: Card[] = [
  {
    image: "/icons/router-3d.jpg",
    title: "Conexão de qualidade",
    text: "Fibra preparada para sua rotina digital.",
  },
  {
    image: "/icons/atendimento-3d.jpg",
    title: "Atendimento próximo",
    text: "Quando precisar de ajuda, a ARP está aqui.",
  },
  {
    image: "/icons/perfil-3d.jpg",
    title: "Planos para diferentes perfis",
    text: "Escolha a velocidade que combina com a sua casa.",
  },
  {
    image: "/icons/foguete-3d.jpg",
    title: "Tecnologia em evolução",
    text: "Uma rede preparada para acompanhar novas necessidades.",
  },
];

export default function Positioning() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal as="p" className="text-eyebrow mb-5 text-orange">
            Por que ARP Fibra?
          </Reveal>
          <SplitHeading
            as="h2"
            className="text-section font-bold"
            text="Tecnologia para conectar."
          />
          <SplitHeading
            as="h2"
            className="text-section font-bold text-text-dim"
            text="Atendimento para aproximar."
            delay={0.15}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Reveal as="p" className="text-lg leading-relaxed text-text-dim">
            Todos os dias buscamos entregar mais qualidade, velocidade e
            tecnologia para levar uma conexão cada vez melhor até você. Porque
            internet não é apenas velocidade.
          </Reveal>
          <ul className="mt-6 space-y-2.5">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r} delay={i * 0.06} className="flex items-center gap-3 text-text">
                <Icon icon="solar:map-arrow-right-bold" className="shrink-0 text-orange" />
                {r}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 0.08}
            className="border-gradient group relative rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-orange/10 transition-colors group-hover:bg-orange/20">
              <Image src={c.image} alt="" width={48} height={48} className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{c.title}</h3>
            <p className="text-sm leading-relaxed text-text-dim">{c.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
