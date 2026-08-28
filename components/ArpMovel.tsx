"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { whatsappCom } from "@/lib/site";

/* Chip em SVG, e não uma foto. O usuário pediu ícone por enquanto; quando a
   foto do chip chegar, é só trocar este bloco por um <Image>.

   O acabamento é metálico de propósito, para conversar com os ícones 3D do
   resto do site em vez de parecer um pictograma chapado: gradiente com
   várias paradas simulando a reflexão do ouro, bisel claro na borda de cima
   e escuro na de baixo (é o que cria a leitura de volume), e as separações
   dos contatos como VÃOS escuros, que é o que existe num chip real — não
   como riscos desenhados por cima. */
function Chip() {
  return (
    <svg
      viewBox="0 0 220 176"
      className="h-auto w-full max-w-[300px] drop-shadow-[0_18px_30px_rgba(120,60,10,0.35)]"
      aria-hidden
    >
      <defs>
        {/* Ouro do corpo. As paradas não são um degradê linear simples: o
            claro no meio e o escuro nas pontas é o que o olho lê como
            superfície curva refletindo luz. */}
        <linearGradient id="chipCorpo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8811f" />
          <stop offset="18%" stopColor="#f6cf7a" />
          <stop offset="42%" stopColor="#e8a83c" />
          <stop offset="62%" stopColor="#f9dc96" />
          <stop offset="85%" stopColor="#d08d24" />
          <stop offset="100%" stopColor="#a9660f" />
        </linearGradient>
        {/* Brilho que corre na diagonal, por cima de tudo */}
        <linearGradient id="chipBrilho" x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="38%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="52%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* Recorta o brilho no formato do chip, senão ele vazaria para fora
            das bordas e do canto chanfrado. */}
        <clipPath id="chipRecorte">
          <path d="M14 6 h150 l42 40 v118 a10 10 0 0 1 -10 10 H14 a10 10 0 0 1 -10 -10 V16 a10 10 0 0 1 10 -10 z" />
        </clipPath>
      </defs>

      {/* Corpo, com o canto chanfrado que todo chip tem */}
      <path
        d="M14 6 h150 l42 40 v118 a10 10 0 0 1 -10 10 H14 a10 10 0 0 1 -10 -10 V16 a10 10 0 0 1 10 -10 z"
        fill="url(#chipCorpo)"
      />

      {/* Vãos entre os contatos. Escuros e largos: num chip real são sulcos,
          e é a sombra dentro deles que dá a sensação de relevo.

          O grupo é recortado no contorno do chip. Sem isso as pontas
          arredondadas dos traços que encostam nas bordas apareciam como
          saliências para FORA do corpo, e o chip ganhava nós nas laterais. */}
      <g
        clipPath="url(#chipRecorte)"
        stroke="#6b3d08"
        strokeOpacity="0.72"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M70 6 V64" />
        <path d="M70 112 V174" />
        <path d="M150 46 V64" />
        <path d="M150 112 V174" />
        <path d="M4 64 H70" />
        <path d="M150 64 H206" />
        <path d="M4 112 H70" />
        <path d="M150 112 H206" />
      </g>

      {/* Contato central, o retângulo que fica no miolo */}
      <rect
        x="78" y="72" width="64" height="32" rx="9"
        fill="none" stroke="#6b3d08" strokeOpacity="0.72" strokeWidth="7"
      />

      {/* Bisel: linha clara na borda de cima e escura na de baixo. É o par
          claro/escuro que o olho interpreta como espessura. */}
      <path
        d="M14 6 h150 l42 40 v118 a10 10 0 0 1 -10 10 H14 a10 10 0 0 1 -10 -10 V16 a10 10 0 0 1 10 -10 z"
        fill="none" stroke="#fff2cf" strokeOpacity="0.55" strokeWidth="2.5"
      />

      {/* Reflexo diagonal */}
      <g clipPath="url(#chipRecorte)">
        <rect x="-40" y="-40" width="300" height="260" fill="url(#chipBrilho)" />
      </g>
    </svg>
  );
}

const destaques = [
  { icon: "solar:sim-card-bold-duotone", texto: "A partir de 800 mega" },
  { icon: "solar:bill-list-bold-duotone", texto: "Na mesma fatura da internet" },
  { icon: "solar:map-point-wave-bold-duotone", texto: "Para usar onde quiser" },
];

export default function ArpMovel() {
  return (
    <section
      id="arp-movel"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36"
    >
      <div className="border-gradient relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        {/* Brilho de marca atrás do chip */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 78% 50%, rgba(255,90,30,0.16), rgba(255,90,30,0) 70%)",
          }}
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal as="p" className="text-eyebrow mb-5 text-orange">
              ARP Móvel
            </Reveal>
            <SplitHeading
              as="h2"
              className="text-section font-bold"
              text="Você sabia que a ARP Fibra"
            />
            <SplitHeading
              as="h2"
              className="text-section font-bold text-text-dim"
              text="também é ARP Móvel?"
              delay={0.15}
            />
            <Reveal as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
              A partir de{" "}
              <span className="font-semibold text-text">800 mega</span>, os
              planos vêm com dados móveis para usar onde você quiser — e tudo
              chega junto na sua fatura de internet.{" "}
              <span className="font-semibold text-text">
                Wi-Fi e dados móveis num plano só.
              </span>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-3">
              {destaques.map((d, i) => (
                <Reveal
                  key={d.texto}
                  delay={i * 0.08}
                  className="flex items-center gap-2.5 rounded-full border border-line bg-cream px-4 py-2.5 text-sm font-medium"
                >
                  <Icon icon={d.icon} className="text-lg text-orange" />
                  {d.texto}
                </Reveal>
              ))}
            </div>

            <Reveal>
              <a
                href={whatsappCom(
                  "Olá, quero saber mais sobre os planos da ARP Móvel, com dados móveis inclusos."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm mt-9"
              >
                Quero dados móveis
                <Icon icon="solar:arrow-right-linear" />
              </a>
            </Reveal>
          </div>

          <Reveal className="flex items-center justify-center">
            <div className="relative flex w-full items-center justify-center">
              <Chip />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
