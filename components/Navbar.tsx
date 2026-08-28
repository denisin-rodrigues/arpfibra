"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Fixa só dentro da primeira seção (Hero); depois disso vira "absolute"
  // no ponto exato onde estava, e rola junto com a página normalmente.
  const [pinned, setPinned] = useState(true);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const updateHeight = () => setHeroHeight(hero.offsetHeight);
    const onScroll = () => setPinned(window.scrollY < hero.offsetHeight);

    updateHeight();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <header
      className="inset-x-0 z-50 flex justify-center px-20 sm:px-9"
      style={{ position: pinned ? "fixed" : "absolute", top: pinned ? 0 : heroHeight }}
    >
      <nav
        aria-label="Principal"
        /* lg:rounded-none — quadrada no desktop, pílula no mobile. O `glass`
           (blur + saturação) segue em ambos. */
        className="glass mx-auto flex w-full max-w-6xl items-center justify-center gap-8 rounded-full px-6 py-2.5 shadow-[0_2px_20px_-6px_rgba(24,14,8,0.15)] transition-all duration-500 sm:gap-14 sm:px-10 sm:py-3 lg:rounded-none"
      >
        <a
          href="#top"
          className="relative flex items-center rounded-lg"
          aria-label="ARP Fibra, início"
        >
          <Image
            src="/logo-arp.png"
            alt="ARP Fibra"
            width={210}
            height={70}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <ul className="relative hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm text-text-dim transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative flex items-center gap-2">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm hidden sm:inline-flex"
          >
            <Icon icon="solar:bolt-bold" className="text-base" />
            Assine agora
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-text md:hidden"
          >
            <Icon
              icon={open ? "solar:close-square-linear" : "solar:hamburger-menu-linear"}
              className="text-xl"
            />
          </button>
        </div>
      </nav>

      {/* Painel mobile */}
      {open && (
        <div
          className="fixed inset-0 top-0 z-40 flex flex-col bg-white px-6 pt-24 md:hidden"
          onClick={() => setOpen(false)}
        >
          <ul className="flex flex-col gap-1">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block border-b border-line py-4 font-display text-2xl font-semibold text-text"
                  style={{ animation: `fadeUp .5s ${i * 0.05}s both` }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 w-full"
          >
            <Icon icon="solar:chat-round-call-bold" className="text-lg" />
            Falar pelo WhatsApp
          </a>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
