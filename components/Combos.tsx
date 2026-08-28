"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";
import { whatsappCom } from "@/lib/site";

type Combo = {
  id: string;
  eyebrow: string;
  title: string;
  price: string;
  altPrice: string;
  bonus?: string;
  features: string[];
  cta: string;
  /* Mensagem que já vai digitada no WhatsApp. Cada plano tem a sua: quem
     clica cai na conversa dizendo qual plano quer, sem precisar explicar,
     e quem atende recebe o contato já qualificado. */
  mensagem: string;
  featured?: boolean;
  social?: boolean;
};

const combos: Combo[] = [
  {
    id: "social",
    eyebrow: "Plano Social",
    title: "Internet para quem mais precisa.",
    price: "49,90",
    altPrice: "Para famílias de baixa renda",
    features: ["Treino ilimitado (Fit Anywhere)", "Livros e leitura ilimitada (Bibliotech)"],
    cta: "Consultar elegibilidade",
    mensagem: "Olá, quero contratar o plano social da ARP Fibra.",
    social: true,
  },
  {
    id: "800mega",
    eyebrow: "Combo 800 Mega Fibra",
    title: "Internet + entretenimento completo.",
    price: "149,90",
    altPrice: "R$ 159,90 sem fidelidade",
    bonus: "Bônus: Filmes, séries e canais (ITTV Total)",
    features: [
      "Dados móveis inclusos (ARP Móvel)",
      "Roteador Wi-Fi 6 em comodato + assistência (ARP-Service)",
      "Leitura ilimitada (Bibliotech)",
      "Treino ilimitado (Fit Anywhere)",
      "Músicas ilimitadas (Deezer)",
      "Cursos com certificado (Leveduca)",
    ],
    cta: "Quero esse combo",
    mensagem:
      "Olá, quero contratar o Combo 800 Mega da ARP Fibra, com dados móveis da ARP Móvel.",
  },
  {
    id: "2giga",
    eyebrow: "Combo 2 Giga Fibra",
    title: "Máxima velocidade para toda a casa.",
    price: "299,90",
    altPrice: "R$ 309,90 sem fidelidade",
    bonus: "Bônus: Wi-Fi em toda a casa",
    features: [
      "Roteador Wi-Fi 6 em comodato + assistência (ARP-Service)",
      "Filmes, séries e canais (ITTV Total)",
      "Leitura ilimitada (Bibliotech)",
      "Treino ilimitado (Fit Anywhere)",
      "Músicas ilimitadas (Deezer)",
      "Cursos com certificado (Leveduca)",
    ],
    cta: "Quero 2 Giga",
    mensagem: "Olá, quero contratar o Combo 2 Giga da ARP Fibra.",
    featured: true,
  },
];

/* Selo animado: roteador com ondas de sinal Wi-Fi pulsando. */
function RouterSignalBadge({ invert = false }: { invert?: boolean }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      {[0, 1].map((r) => (
        <span
          key={r}
          aria-hidden
          className={`absolute rounded-full border ${invert ? "border-white/40" : "border-orange/35"}`}
          style={{
            width: `${100 + r * 40}%`,
            height: `${100 + r * 40}%`,
            animation: `comboPulse 2.4s ${r * 0.5}s ease-out infinite`,
          }}
        />
      ))}
      <span
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ${
          invert ? "bg-white/15 text-white" : "bg-orange/10 text-orange"
        }`}
      >
        <Icon icon="solar:wi-fi-router-bold-duotone" className="text-lg" />
      </span>
      <style jsx>{`
        @keyframes comboPulse {
          0% { transform: scale(0.85); opacity: 0.65; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Combos() {
  return (
    <section id="combos" className="relative scroll-mt-24 overflow-hidden bg-bg-elev py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,90,30,0.5), rgba(255,90,30,0) 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mb-14 max-w-2xl">
          <Reveal as="p" className="text-eyebrow mb-5 text-orange">
            Muito além da internet
          </Reveal>
          <SplitHeading
            as="h2"
            className="text-section font-bold"
            text="Combos ARP: internet e muito mais."
          />
          <Reveal as="p" className="mt-5 text-lg leading-relaxed text-text-dim">
            Fibra de alta velocidade unida a streaming, treino, leitura, música e
            cursos. Tudo em um único plano, sem fidelidade.
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {combos.map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 0.1}
              className={`relative flex flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5 ${
                c.featured ? "halo border-2 border-orange bg-white" : "border-gradient"
              }`}
            >
              {c.featured && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-orange px-3 py-1 text-xs font-bold tracking-wide text-white">
                  <Icon icon="solar:bolt-bold" /> MAIS VELOCIDADE
                </span>
              )}

              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-eyebrow text-orange">{c.eyebrow}</p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold">{c.title}</h3>
                </div>
                {!c.social && <RouterSignalBadge />}
                {c.social && (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <Icon icon="solar:hand-heart-bold-duotone" className="text-2xl" />
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold text-text-dim">R$</span>
                <span className="font-display text-4xl font-extrabold tracking-tight text-glow">
                  {c.price}
                </span>
                <span className="text-sm text-text-dim">/mês</span>
              </div>
              <p className="mt-1.5 text-xs font-medium text-text-faint">{c.altPrice}</p>

              {c.bonus && (
                <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-medium text-text">
                  <Icon icon="solar:gift-bold-duotone" className="shrink-0 text-lg text-orange" />
                  {c.bonus}
                </div>
              )}

              <ul className="my-6 space-y-3 border-t border-line pt-6">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Icon icon="solar:check-circle-bold" className="mt-0.5 shrink-0 text-orange" />
                    <span className="text-text">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappCom(c.mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-sm mt-auto w-full ${c.featured ? "btn-primary" : "btn-ghost"}`}
              >
                {c.cta}
                <Icon icon="solar:arrow-right-linear" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
