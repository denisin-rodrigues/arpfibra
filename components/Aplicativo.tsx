"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { site } from "@/lib/site";

/* Selos das lojas desenhados em SVG, e não como imagem baixada.

   Três motivos: nenhuma requisição a um host de terceiros (o badge oficial
   costuma ser servido de um CDN da Apple/Google que podemos não controlar),
   nitidez em qualquer densidade de tela, e nenhum arquivo novo no bundle.
   O desenho segue o padrão oficial — retângulo preto arredondado, logo à
   esquerda, chamada pequena em cima e o nome da loja embaixo. */

function SeloAppStore() {
  return (
    <svg viewBox="0 0 135 40" className="h-[46px] w-auto" role="img" aria-label="Baixar na App Store">
      <rect width="135" height="40" rx="7" fill="#000" />
      <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" fill="none" stroke="#A6A6A6" strokeWidth="1" />
      {/* Maçã */}
      <g transform="translate(10.5, 8) scale(0.98)">
        <path
          fill="#fff"
          d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
        />
      </g>
      <text x="43" y="16" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5">
        Baixar na
      </text>
      <text x="43" y="31" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="600">
        App Store
      </text>
    </svg>
  );
}

function SeloGooglePlay() {
  return (
    <svg viewBox="0 0 135 40" className="h-[46px] w-auto" role="img" aria-label="Disponível no Google Play">
      <rect width="135" height="40" rx="7" fill="#000" />
      <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" fill="none" stroke="#A6A6A6" strokeWidth="1" />
      {/* Triângulo do Play, nas quatro cores oficiais */}
      <g transform="translate(11, 8) scale(1)">
        <path fill="#2196F3" d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5z" />
        <path fill="#4CAF50" d="M16.81 15.12 6.05 21.34l8.49-8.49 2.27 2.27z" />
        <path fill="#FFC107" d="M20.16 10.81c.34.27.59.69.59 1.19 0 .5-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31z" />
        <path fill="#F44336" d="M6.05 2.66 16.81 8.88l-2.27 2.27L6.05 2.66z" />
      </g>
      <text x="43" y="16" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5">
        Disponível no
      </text>
      <text x="43" y="31" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="600">
        Google Play
      </text>
    </svg>
  );
}

const passos = [
  {
    titulo: "Baixe o aplicativo",
    texto: "Procure por ARP Telecom na loja do seu celular, ou use os botões abaixo.",
  },
  {
    titulo: "Informe seu CPF ou CNPJ",
    texto: "É o mesmo documento que está no seu contrato com a ARP.",
  },
  {
    titulo: "Toque em Entrar",
    texto: "Pronto. Fatura, velocidade, suporte e contrato ficam todos na sua mão.",
  },
];

export default function Aplicativo() {
  return (
    <section
      id="aplicativo"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36"
    >
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
        {/* ---------- Chamada ---------- */}
        <div>
          <Reveal as="p" className="text-eyebrow mb-5 text-orange">
            Aplicativo ARP Telecom
          </Reveal>
          <SplitHeading
            as="h2"
            className="text-section font-bold"
            text="Sua conta no bolso."
          />
          <SplitHeading
            as="h2"
            className="text-section font-bold text-text-dim"
            text="Em três passos."
            delay={0.15}
          />
          <Reveal as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
            Fatura, teste de velocidade, suporte e contrato. Tudo no mesmo
            lugar, sem precisar ligar para ninguém.
          </Reveal>

          {/* Selos das lojas. Abrem em nova aba porque saem do site. */}
          <Reveal className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={site.app.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-0.5"
            >
              <SeloAppStore />
            </a>
            <a
              href={site.app.android}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-0.5"
            >
              <SeloGooglePlay />
            </a>
          </Reveal>

          <Reveal>
            <a
              href={site.central}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm mt-6"
            >
              Prefere pelo navegador? Acesse a Central
              <Icon icon="solar:arrow-right-linear" className="text-orange" />
            </a>
          </Reveal>
        </div>

        {/* ---------- Passo a passo ----------
            Lista ordenada de verdade (<ol>), e não divs numeradas: a ordem é
            parte da informação, e um leitor de tela anuncia "item 2 de 3"
            sozinho. O número visível vem do contador de CSS pelo mesmo
            motivo — não duplica o que a marcação já diz. */}
        <Reveal>
          <ol className="space-y-3">
            {passos.map((p, i) => (
              <li
                key={p.titulo}
                className="flex items-start gap-4 rounded-2xl border border-line bg-cream p-6"
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold leading-snug">
                    {p.titulo}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-dim">
                    {p.texto}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
