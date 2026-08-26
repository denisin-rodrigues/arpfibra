"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { whatsappCom } from "@/lib/site";

/* Chip em SVG, e não uma foto. O usuário pediu ícone por enquanto; quando a
   foto do chip chegar, é só trocar este bloco por um <Image>. Feito à mão em
   vez de vir da biblioteca de ícones porque o contorno com os contatos
   dourados é reconhecível de imediato como "chip de celular", e nenhum ícone
   genérico de SIM passa isso no tamanho grande que a seção usa. */
function Chip() {
  return (
    <svg viewBox="0 0 120 96" className="h-auto w-full max-w-[220px]" aria-hidden>
      <defs>
        <linearGradient id="chipOuro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8c76a" />
          <stop offset="50%" stopColor="#e0952f" />
          <stop offset="100%" stopColor="#b9701c" />
        </linearGradient>
      </defs>
      {/* Corpo do chip, com o canto chanfrado que todo SIM tem */}
      <path
        d="M8 4 h84 l20 20 v68 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4 V8 a4 4 0 0 1 4 -4 z"
        fill="url(#chipOuro)"
      />
      {/* Trilhas de contato */}
      <g stroke="#8a4f12" strokeWidth="2.5" opacity="0.65" fill="none">
        <path d="M40 4 v88" />
        <path d="M76 4 v88" />
        <path d="M4 34 h34" />
        <path d="M78 34 h34" />
        <path d="M4 62 h34" />
        <path d="M78 62 h34" />
        <rect x="44" y="30" width="28" height="36" rx="6" />
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
