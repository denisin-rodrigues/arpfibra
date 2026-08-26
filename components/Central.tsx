"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { site } from "@/lib/site";

const services = [
  {
    image: "/icons/central-assinante-3d.png",
    title: "Central do Assinante",
    text: "Consulte informações da sua conta, atendimento e outros serviços.",
    cta: "Acessar central",
    href: site.central,
  },
  {
    image: "/icons/boleto-3d.png",
    title: "2ª via de boleto",
    text: "Emita sua fatura de maneira rápida e prática.",
    cta: "Emitir boleto",
    href: site.boleto,
  },
  {
    image: "/icons/suporte-tecnico-3d.png",
    title: "Suporte técnico",
    text: "Precisa de ajuda com sua conexão? Nossa equipe está pronta para atender.",
    cta: "Solicitar suporte",
    href: site.whatsapp,
  },
  {
    image: "/icons/velocidade-3d.png",
    title: "Teste de velocidade",
    text: "Confira o desempenho atual da sua conexão.",
    cta: "Testar conexão",
    href: "https://www.speedtest.net",
  },
];

export default function Central() {
  return (
    <section id="central" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36">
      <div className="mb-14 max-w-2xl">
        <Reveal as="p" className="text-eyebrow mb-5 text-orange">
          Resolva sem complicação
        </Reveal>
        <SplitHeading
          as="h2"
          className="text-section font-bold"
          text="Tudo o que você precisa, mais perto de você."
        />
        <Reveal as="p" className="mt-5 text-lg text-text-dim">
          Acesse rapidamente os principais serviços da ARP Fibra.
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-gradient group flex h-full items-start gap-5 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={s.image}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full scale-125 object-contain"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{s.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange transition-transform group-hover:translate-x-1">
                  {s.cta}
                  <Icon icon="solar:arrow-right-linear" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
