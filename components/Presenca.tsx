"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { site, anosDeMercado } from "@/lib/site";

/* O número NÃO é escrito à mão: sai de site.fundacao. Texto com "13 anos"
   fixo envelhece sozinho e vira mentira na virada do aniversário, num bloco
   cuja função é justamente passar credibilidade. */
const anos = anosDeMercado();

const investimentos = [
  { icon: "solar:banknote-2-bold-duotone", texto: "Mais investe na região" },
  { icon: "solar:users-group-rounded-bold-duotone", texto: "Mais emprega" },
  { icon: "solar:basketball-bold-duotone", texto: "Mais apoia o esporte" },
  { icon: "solar:heart-bold-duotone", texto: "Mais ações sociais" },
  { icon: "solar:masks-bold-duotone", texto: "Mais apoia a cultura" },
  { icon: "solar:calendar-mark-bold-duotone", texto: "Mais faz eventos" },
  { icon: "solar:rocket-bold-duotone", texto: "Mais cria oportunidades" },
];

export default function Presenca() {
  return (
    <section
      id="presenca"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* ---------- Texto ---------- */}
        <div>
          <Reveal as="p" className="text-eyebrow mb-5 text-orange">
            Desde {site.fundacao.getFullYear()}
          </Reveal>
          <SplitHeading
            as="h2"
            className="text-section font-bold"
            text={`${anos} anos ligando Mambaí ao mundo.`}
          />
          <SplitHeading
            as="h2"
            className="text-section font-bold text-text-dim"
            text="Tempo de casa não se improvisa."
            delay={0.15}
          />

          <Reveal as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
            A ARP Fibra nasceu aqui em{" "}
            <span className="font-semibold text-text">junho de {site.fundacao.getFullYear()}</span>{" "}
            e nunca saiu. São {anos} anos atendendo as mesmas ruas, conhecendo
            cliente pelo nome e respondendo por cada conexão que instala.
            Provedor que fica é provedor que dá as caras quando algo dá errado.
          </Reveal>

          {/* Marcador do tempo de casa: número grande porque é o argumento
              central do bloco, e a linha ao lado dá o contexto sem repetir
              a palavra "anos" que já está no número. */}
          <Reveal className="mt-9 flex items-center gap-5">
            <span className="font-display text-6xl font-bold leading-none text-orange sm:text-7xl">
              {anos}
            </span>
            <span className="text-sm leading-snug text-text-dim">
              anos de mercado
              <br />
              em {site.address.city}
            </span>
          </Reveal>
        </div>

        {/* ---------- Fachada ---------- */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/fachada.webp"
              alt={`Fachada da loja da ARP Fibra em ${site.address.city}`}
              width={1280}
              height={701}
              sizes="(min-width: 1024px) 620px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>

      {/* ---------- O que a ARP devolve para a região ---------- */}
      <div className="mt-16 sm:mt-20">
        <Reveal as="p" className="mb-8 max-w-2xl font-display text-xl font-bold leading-snug sm:text-2xl">
          O provedor de internet que mais investe na região.
        </Reveal>

        <div className="flex flex-wrap gap-3">
          {investimentos.map((it, i) => (
            <Reveal
              key={it.texto}
              delay={i * 0.06}
              className="flex items-center gap-2.5 rounded-full border border-line bg-cream px-4 py-2.5 text-sm font-medium"
            >
              <Icon icon={it.icon} className="text-lg text-orange" />
              {it.texto}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
