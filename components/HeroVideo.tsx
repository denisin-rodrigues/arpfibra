"use client";

import { useEffect, useState } from "react";
import { podeCarregarMidiaPesada } from "@/lib/connection";

/* Vídeo de fundo da hero, separado num componente de cliente só para poder
   decidir se baixa ou não.

   A decisão roda num useEffect, e não no render: no servidor não existe
   `navigator`, e escolher durante o render faria o HTML do servidor divergir
   do cliente e quebrar a hidratação. Por isso o vídeo começa fora da árvore e
   entra depois da montagem.

   O efeito colateral é bom: mesmo numa conexão rápida o vídeo sai do caminho
   crítico do primeiro desenho. Quem não recebe o vídeo continua vendo o fundo
   estático pré-borrado que já fica atrás dele — a hero não fica vazia. */
export default function HeroVideo() {
  const [carregar, setCarregar] = useState(false);

  useEffect(() => {
    if (podeCarregarMidiaPesada()) setCarregar(true);
  }, []);

  if (!carregar) return null;

  return (
    <div className="absolute inset-0 flex -translate-y-[4%] items-center justify-center lg:translate-y-0">
      <video
        className="hero-video-mask aspect-video h-auto w-full max-w-none scale-[1.5] object-cover lg:h-full lg:w-auto lg:scale-100"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
