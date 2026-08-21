/* Configuração do efeito Lightfall (reactbits.dev) usado como fundo da
   section 2.

   Definido como constante de módulo de propósito: o useEffect do componente
   tem `colors` entre as dependências, e um array montado inline no JSX seria
   uma referência nova a cada render — o que destruiria e recriaria a cena
   WebGL inteira toda vez. */
export const LIGHTFALL_SECTION2 = {
  colors: ["#000000", "#F97316", "#000000"],
  backgroundColor: "#ed6700",
  speed: 0.5,
  streakCount: 2,
  streakWidth: 1,
  streakLength: 1,
  density: 0.6,
  twinkle: 1,
  glow: 1,
  backgroundGlow: 0.5,
  zoom: 3,
  opacity: 1,
  mouseInteraction: true,
  mouseStrength: 0.5,
  mouseRadius: 1,
} as const;
