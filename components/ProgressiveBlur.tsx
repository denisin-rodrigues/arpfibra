// Componente de servidor puro — só HTML com estilos inline, sem hooks.

/* Desfoque progressivo na base da tela.
 *
 * A versão anterior empilhava OITO camadas de backdrop-filter, com o raio
 * subindo de 0,25px até 32px, cada uma com sua própria máscara. Visitantes
 * relataram travamento até em máquina boa, e era isto.
 *
 * backdrop-filter obriga o navegador a copiar tudo que está atrás do
 * elemento, desfocar e recompor A CADA QUADRO. Empilhados, os oito faziam
 * isso oito vezes por quadro, cada um sobre o resultado do anterior. E como
 * a barra é `fixed`, o fundo muda a cada pixel de rolagem — nada pode ser
 * reaproveitado entre quadros. Por cima do vídeo da hero e do shader WebGL,
 * que se movem sozinhos, o reaproveitamento é impossível por definição.
 * Davam cerca de 2 milhões de pixels de desfoque por quadro, o tempo todo,
 * em todas as seções: a GPU saturava e a página inteira travava junto.
 *
 * Agora são DUAS camadas. A gradação do efeito não vem mais de oito raios
 * diferentes e sim da máscara: onde ela é opaca aparece o desfoque, onde é
 * transparente aparece o fundo nítido, e o degradê entre os dois lê como
 * desfoque que aumenta na direção da borda. O raio máximo também caiu de
 * 32px para 14px — o custo de um desfoque cresce com o raio, então essa
 * queda vale tanto quanto ter tirado camadas.
 *
 * Duas camadas em vez de uma só porque com uma a passagem de nítido para
 * desfocado fica dura demais num trecho de 200px; com duas, a de raio menor
 * cobre o meio e emenda as pontas.
 */
const CAMADAS = [
  // [raio do desfoque, parada da máscara]
  [5, "transparent 0%, black 55%, black 100%"],
  [14, "transparent 45%, black 90%, black 100%"],
] as const;

export default function ProgressiveBlur() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "200px",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {CAMADAS.map(([blur, stops]) => {
        const mask = `linear-gradient(to bottom, ${stops})`;
        return (
          <div
            key={blur}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
