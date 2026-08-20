"use client";

import { useRef } from "react";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { site } from "@/lib/site";
import { useStackOverPrevious } from "@/lib/useStackOverPrevious";

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  useStackOverPrevious(sectionRef);

  return (
    <section
      ref={sectionRef}
      /* z-10 e fundo opaco são requisitos do empilhamento — ver o hook. */
      className="section-orange notch-top relative z-10 overflow-hidden pb-32 pt-40 sm:pb-44 sm:pt-52"
    >
      {/* Brilho branco sutil */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <SplitHeading
          as="h2"
          className="text-hero font-bold text-white"
          text="Pronto para mudar a forma como você se conecta?"
        />
        <Reveal as="p" className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-text-dim">
          Escolha seu plano e descubra a experiência de ter uma internet
          preparada para acompanhar sua rotina.
        </Reveal>
        <Reveal className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#combos" className="btn btn-white">
            <Icon icon="solar:widget-5-bold" className="text-lg" />
            Ver combos
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-white"
          >
            <Icon icon="solar:chat-round-call-bold" className="text-lg" />
            Falar pelo WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
