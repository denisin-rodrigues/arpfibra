"use client";

import { Icon } from "@iconify/react";
import { SplitHeading, Reveal } from "./Reveal";

const perks = [
  { icon: "solar:tuning-square-2-bold-duotone", label: "Mais eficiência" },
  { icon: "solar:layers-bold-duotone", label: "Mais capacidade" },
  { icon: "solar:home-wifi-bold-duotone", label: "Mais conexão dentro de casa" },
];

export default function Wifi6() {
  return (
    <section id="wifi6" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal as="p" className="text-eyebrow mb-5 text-orange">
            Mais performance
          </Reveal>
          <SplitHeading as="h2" className="text-section font-bold" text="Sua internet é rápida." />
          <SplitHeading
            as="h2"
            className="text-section font-bold text-text-dim"
            text="Seu Wi-Fi também precisa ser."
            delay={0.15}
          />
          <Reveal as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-text-dim">
            Planos selecionados contam com roteador{" "}
            <span className="font-semibold text-text">Wi-Fi 6 em comodato</span>,
            tecnologia preparada para ambientes com diversos dispositivos
            conectados simultaneamente.
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            {perks.map((p, i) => (
              <Reveal
                key={p.label}
                delay={i * 0.08}
                className="flex items-center gap-2.5 rounded-full border border-line bg-cream px-4 py-2.5 text-sm font-medium"
              >
                <Icon icon={p.icon} className="text-lg text-orange" />
                {p.label}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a
              href="#combos"
              className="btn btn-ghost btn-sm mt-9"
            >
              Ver combos disponíveis
              <Icon icon="solar:arrow-right-linear" className="text-orange" />
            </a>
          </Reveal>
        </div>

        {/* Visual do roteador Wi-Fi 6 com ondas */}
        <Reveal className="relative flex items-center justify-center">
          <div className="border-gradient relative flex aspect-square w-full max-w-sm items-center justify-center rounded-[2rem]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[2rem]"
              style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,90,30,0.18), rgba(255,90,30,0) 60%)" }}
            />
            {/* Ondas concêntricas */}
            {[0, 1, 2].map((r) => (
              <span
                key={r}
                aria-hidden
                className="absolute rounded-full border border-orange/25"
                style={{
                  width: `${45 + r * 22}%`,
                  height: `${45 + r * 22}%`,
                  animation: `pulse6 3s ${r * 0.5}s ease-out infinite`,
                }}
              />
            ))}
            <Icon icon="solar:wi-fi-router-bold-duotone" className="relative z-10 text-7xl text-orange" />
            <span className="absolute bottom-6 z-10 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
              Wi-Fi 6
            </span>
          </div>
          <style jsx>{`
            @keyframes pulse6 {
              0% { transform: scale(0.85); opacity: 0.7; }
              100% { transform: scale(1.15); opacity: 0; }
            }
          `}</style>
        </Reveal>
      </div>
    </section>
  );
}
