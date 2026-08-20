"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { site } from "@/lib/site";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white shadow-[0_10px_40px_-8px_rgba(255,90,30,0.8)] transition-all duration-500 hover:bg-orange-deep ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-orange/40" />
      <Icon icon="solar:chat-round-call-bold" className="relative text-2xl" />
    </a>
  );
}
