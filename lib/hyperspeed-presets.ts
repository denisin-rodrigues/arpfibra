/* Presets do efeito Hyperspeed (reactbits.dev/backgrounds/hyperspeed).
   Definidos como constantes de módulo de propósito: o componente recria a
   cena WebGL inteira sempre que a referência de `effectOptions` muda, então
   o objeto precisa ser estável entre renders — nunca montar inline no JSX. */

/* Preset "five". Os faróis do lado esquerdo (0xdc5b20 / 0xdca320 / 0xdc2020)
   caem quase em cima do laranja da marca, por isso este preset combina com
   a identidade da ARP sem precisar de ajuste de cor. */
export const HYPERSPEED_PRESET_FIVE = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [20, 60],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.2, 0.2],
  carFloorSeparation: [0.05, 1],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xdc5b20, 0xdca320, 0xdc2020],
    rightCars: [0x334bf7, 0xe5e6ed, 0xbfc6f3],
    sticks: 0xc5e8eb,
  },
} as const;
