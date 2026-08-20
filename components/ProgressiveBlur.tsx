// Componente de servidor puro — só HTML com estilos inline, sem hooks.
const BLUR_LEVELS = [0.25, 0.5, 1, 2, 4, 8, 16, 32];

// Cada camada revela uma faixa da barra (0% = topo, 100% = base/borda da
// tela), com bordas suaves que se sobrepõem à faixa vizinha. Blur mais
// forte perto da borda da tela, dissolvendo até nada no topo da barra.
const MASK_STOPS = [
  "transparent 0%, black 12.5%, black 25%, transparent 37.5%",
  "transparent 12.5%, black 25%, black 37.5%, transparent 50%",
  "transparent 25%, black 37.5%, black 50%, transparent 62.5%",
  "transparent 37.5%, black 50%, black 62.5%, transparent 75%",
  "transparent 50%, black 62.5%, black 75%, transparent 87.5%",
  "transparent 62.5%, black 75%, black 87.5%, transparent 100%",
  "transparent 75%, black 87.5%, black 100%",
  "transparent 87.5%, black 100%",
];

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
      {BLUR_LEVELS.map((blur, i) => {
        const mask = `linear-gradient(to bottom, ${MASK_STOPS[i]})`;
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
