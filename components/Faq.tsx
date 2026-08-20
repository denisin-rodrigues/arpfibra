"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

const faqs = [
  {
    q: "O que é análise de viabilidade técnica?",
    a: "Antes da instalação, pode ser necessário avaliar tecnicamente o endereço para verificar se o sinal disponível atende aos padrões necessários para uma boa conexão.",
  },
  {
    q: "Qual o prazo para instalação?",
    a: "O prazo pode variar conforme a demanda e a disponibilidade da equipe. A instalação é realizada mediante agendamento.",
  },
  {
    q: "Como funciona a fibra óptica?",
    a: "A fibra óptica transmite dados utilizando sinais de luz através de filamentos extremamente finos, proporcionando alta capacidade de transmissão.",
  },
  {
    q: "Como acesso minha fatura?",
    a: "Você pode acessar a Central do Assinante ou utilizar a opção de 2ª via disponível nos canais digitais da ARP.",
  },
  {
    q: "Estou com problema na conexão. O que faço?",
    a: "Entre em contato diretamente com o suporte técnico da ARP pelo WhatsApp ou pelos canais de atendimento.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl scroll-mt-24 px-5 py-28 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mb-12 text-center">
        <Reveal as="p" className="text-eyebrow mb-5 text-orange">
          Dúvidas frequentes
        </Reveal>
        <SplitHeading
          as="h2"
          className="text-section font-bold"
          text="Algumas respostas antes mesmo de você perguntar."
        />
      </div>

      <div className="divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg font-semibold">{f.q}</span>
                <Icon
                  icon="solar:alt-arrow-down-linear"
                  className={`shrink-0 text-xl text-orange transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-${i}`}
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 pr-8 leading-relaxed text-text-dim">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
