"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { site } from "@/lib/site";

export default function Support() {
  return (
    <section className="relative overflow-hidden bg-bg-elev py-28 sm:py-36">
      {/* Mesmo caso do brilho da seção de combos: o blur(130px) sobre um
          degradê radial era redundante e caro. A margem negativa mantém o
          centro no mesmo ponto agora que a peça é maior. */}
      <div
        aria-hidden
        className="absolute left-1/4 top-1/2 -ml-32 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255,90,30,0.44) 0%, rgba(255,90,30,0.23) 38%, rgba(255,90,30,0) 72%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal as="p" className="text-eyebrow mb-5 text-orange">
          Quando precisar, chame a ARP.
        </Reveal>
        <SplitHeading
          as="h2"
          className="text-section mx-auto max-w-3xl font-bold"
          text="Tecnologia boa também precisa de atendimento bom."
        />
        <Reveal as="p" className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
          Nada pior que ter um problema e não saber com quem falar. Por isso,
          deixamos nossos canais de atendimento sempre ao seu alcance.
        </Reveal>

        <Reveal className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Icon icon="solar:chat-round-call-bold" className="text-lg" />
            Falar pelo WhatsApp
          </a>
          <a
            href={site.central}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <Icon icon="solar:user-id-bold" className="text-lg" />
            Central do Assinante
          </a>
        </Reveal>
      </div>
    </section>
  );
}
