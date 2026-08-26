"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

/* O que vem junto com o plano, fora a internet. A ordem não é aleatória:
   abre com os dois de maior peso percebido (curso com certificado e médico
   online, que a pessoa compraria à parte) e fecha com o roteador, que é o
   único item de equipamento e serve de ponte para a seção do Wi-Fi 6. */
const beneficios = [
  {
    icon: "solar:diploma-verified-bold-duotone",
    titulo: "+200 cursos profissionalizantes",
    texto: "Com certificado ao concluir.",
  },
  {
    icon: "solar:stethoscope-bold-duotone",
    titulo: "Médico online",
    texto: "Faça consultas sem sair de casa.",
  },
  {
    icon: "solar:tv-bold-duotone",
    titulo: "+100 canais de TV",
    texto: "Filmes, séries e canais ao vivo.",
  },
  {
    icon: "solar:music-note-2-bold-duotone",
    titulo: "App de músicas",
    texto: "Crie sua playlist personalizada.",
  },
  {
    icon: "solar:dumbbell-large-bold-duotone",
    titulo: "Academia online",
    texto: "Treine em casa, no seu horário.",
  },
  {
    icon: "solar:book-bookmark-bold-duotone",
    titulo: "Bibliotech",
    texto: "App de leitura, livros ilimitados.",
  },
  {
    icon: "solar:wi-fi-router-bold-duotone",
    titulo: "Roteador Wi-Fi 6",
    texto: "Em comodato, sem custo extra.",
  },
];

export default function Beneficios() {
  return (
    <section
      id="beneficios"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36"
    >
      <div className="mb-12 max-w-2xl">
        <Reveal as="p" className="text-eyebrow mb-5 text-orange">
          Vem junto com o plano
        </Reveal>
        <SplitHeading
          as="h2"
          className="text-section font-bold"
          text="Você contrata internet."
        />
        <SplitHeading
          as="h2"
          className="text-section font-bold text-text-dim"
          text="E leva muito mais que isso."
          delay={0.15}
        />
        <Reveal as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
          Tudo abaixo já está incluído, sem mensalidade separada e sem
          aplicativo pago à parte.
        </Reveal>
      </div>

      {/* auto-rows-fr iguala a altura dos cartões da mesma linha: sem isso o
          card de texto curto encolhe e a grade fica com degraus. */}
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beneficios.map((b, i) => (
          <Reveal
            key={b.titulo}
            delay={i * 0.06}
            className="flex items-start gap-4 rounded-2xl border border-line bg-cream p-6 transition-colors duration-300 hover:border-orange/40"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange/10">
              <Icon icon={b.icon} className="text-2xl text-orange" />
            </span>
            <span className="min-w-0">
              <span className="block font-display font-bold leading-snug">
                {b.titulo}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-text-dim">
                {b.texto}
              </span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
