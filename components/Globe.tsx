"use client";

/* Globo terrestre em CSS puro: um círculo com a textura do mapa-múndi
   rolando na horizontal, mais sombras internas que simulam a iluminação
   lateral e dão o volume de esfera.

   Três desvios do componente de origem, todos deliberados:

   - A textura é servida daqui (public/globe-textura.jpg) em vez de um CDN
     de terceiros. Evita que o navegador de cada visitante faça uma requisição
     a um host que não controlamos, e que a seção quebre se aquele bucket sair
     do ar.
   - As estrelas foram removidas. No original elas ficam FORA do círculo
     (left: -20px, top: 290px…) enquanto o contêiner tem overflow-hidden —
     ou seja, quase todas eram recortadas e nunca apareciam. Aqui a seção já
     tem as partículas do Lightfall.
   - Sem o invólucro `h-screen`: o tamanho e a posição vêm por className, para
     o globo caber onde for usado em vez de ocupar a tela inteira. */

const TILE_PX = 640;

export default function Globe({ className = "" }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes globeSpin {
          from { background-position-x: 0px; }
          to   { background-position-x: -${TILE_PX}px; }
        }
      `}</style>
      <div
        aria-hidden
        className={`rounded-full ${className}`}
        style={{
          backgroundImage: "url('/globe-textura.jpg')",
          /* Largura do ladrilho fixa em px e deslocamento igual a ela: é o que
             garante emenda invisível no laço. Com `cover` o passo não bate com
             a largura da textura e a volta salta. */
          backgroundSize: `${TILE_PX}px 100%`,
          backgroundRepeat: "repeat-x",
          animation: "globeSpin 30s linear infinite",
          boxShadow:
            "0 0 20px rgba(255,255,255,0.2), -5px 0 8px #c3f4ff inset, 15px 2px 25px #000 inset, -24px -2px 34px #c3f4ff99 inset, 250px 0 44px #00000066 inset, 150px 0 38px #000000aa inset",
        }}
      />
    </>
  );
}
