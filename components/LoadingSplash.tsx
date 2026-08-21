"use client";

import { useEffect, useState } from "react";

/* Duração do vídeo (3,07s) arredondada para baixo, para o fade começar
   enquanto o último quadro ainda está na tela em vez de depois de um
   congelamento. Precisa bater com o `animation-delay` de .splash no CSS —
   os dois mudam juntos sempre que a peça for trocada. */
const VIDEO_MS = 3000;
const FADE_MS = 500;

export default function LoadingSplash() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    /* Trava a rolagem enquanto a cortina está de pé. A limpeza é garantida
       pelo próprio desmonte, então não há risco de a página ficar presa. */
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setGone(true), VIDEO_MS + FADE_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  /* Renderizado já no HTML inicial (não atrás de um `mounted`), senão o site
     apareceria por um quadro antes da cortina subir. O fade é feito por
     animação CSS, e não por JS: assim a cortina também sai sozinha se o
     script falhar ou o autoplay do vídeo for bloqueado. */
  return (
    <div className="splash" aria-hidden>
      <video
        src="/carregando.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
