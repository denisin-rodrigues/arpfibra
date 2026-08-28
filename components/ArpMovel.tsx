"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { whatsappCom } from "@/lib/site";

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
              planos vêm com dados móveis para usar onde você quiser, e tudo
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

          {/* Cartão da ARP Móvel. Substituiu um chip que eu havia desenhado
              em SVG enquanto a arte não existia; esta é a peça de marca real,
              com recorte de verdade (34% do quadro é transparente), então
              assenta direto sobre o fundo claro da seção sem moldura. */}
          <Reveal className="flex items-center justify-center">
            <Image
              src="/chip-arp.webp"
              alt="Chip da ARP Móvel com 15 giga de dados"
              width={900}
              height={600}
              sizes="(min-width: 1024px) 380px, 80vw"
              className="h-auto w-full max-w-[380px] drop-shadow-[0_18px_34px_rgba(190,80,20,0.28)]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
