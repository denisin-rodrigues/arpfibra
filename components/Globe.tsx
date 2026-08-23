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
     o globo caber onde for usado em vez de ocupar a tela inteira.

   A rotação anima `transform`, e não `background-position`. Na primeira
   versão eu animava a posição do fundo, e o Lighthouse acusou: nenhum
   navegador compõe `background-position` na GPU, então o círculo inteiro era
   repintado a cada quadro, para sempre, mesmo fora da tela. Com transform o
   trabalho sai da thread principal.

   Isso obrigou a separar em três camadas. `box-shadow: inset` pinta acima do
   fundo do próprio elemento mas ABAIXO dos filhos: com a textura virando um
   filho, as sombras que dão volume à esfera ficariam atrás dela e sumiriam.
   Por isso o sombreado interno virou uma camada própria, por cima. */

const TILE_PX = 640;

/* Insets ficam na camada de cima; o brilho externo continua no círculo, senão
   o overflow-hidden do pai o recortaria. */
const SOMBRA_INTERNA =
  "-5px 0 8px #c3f4ff inset, 15px 2px 25px #000 inset, -24px -2px 34px #c3f4ff99 inset, 250px 0 44px #00000066 inset, 150px 0 38px #000000aa inset";

export default function Globe({ className = "" }: { className?: string }) {
  return (
    <>
      <style>{`
        @keyframes globeSpin {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-${TILE_PX}px, 0, 0); }
        }
      `}</style>
      <div
        aria-hidden
        className={`relative overflow-hidden rounded-full ${className}`}
        style={{ boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
      >
        {/* Faixa de textura. Mede DOIS ladrilhos e desliza exatamente um: no
            fim do ciclo o segundo ladrilho está onde o primeiro começou, então
            a volta é invisível. Com `cover` o passo não bateria com a largura
            da textura e a emenda saltaria. */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${TILE_PX * 2}px`,
            backgroundImage: "url('/globe-textura.jpg')",
            backgroundSize: `${TILE_PX}px 100%`,
            backgroundRepeat: "repeat-x",
            animation: "globeSpin 30s linear infinite",
          }}
        />
        {/* Volume da esfera, por cima da textura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: SOMBRA_INTERNA }}
        />
      </div>
    </>
  );
}
