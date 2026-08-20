/* O componente é .jsx (mantido igual ao upstream do React Bits). Sem estas
   declarações o TypeScript infere os props a partir do objeto DEFAULT_
   EFFECT_OPTIONS e passa a exigir TODAS as chaves — inclusive onSpeedUp e
   onSlowDown — em qualquer preset parcial. */
import type { ReactElement } from "react";

type Range = readonly [number, number];

export interface HyperspeedColors {
  roadColor?: number;
  islandColor?: number;
  background?: number;
  shoulderLines?: number;
  brokenLines?: number;
  leftCars?: readonly number[];
  rightCars?: readonly number[];
  sticks?: number | readonly number[];
}

export interface HyperspeedOptions {
  onSpeedUp?: (ev: Event) => void;
  onSlowDown?: (ev: Event) => void;
  distortion?: string;
  length?: number;
  roadWidth?: number;
  islandWidth?: number;
  lanesPerRoad?: number;
  fov?: number;
  fovSpeedUp?: number;
  speedUp?: number;
  carLightsFade?: number;
  totalSideLightSticks?: number;
  lightPairsPerRoadWay?: number;
  shoulderLinesWidthPercentage?: number;
  brokenLinesWidthPercentage?: number;
  brokenLinesLengthPercentage?: number;
  lightStickWidth?: Range;
  lightStickHeight?: Range;
  movingAwaySpeed?: Range;
  movingCloserSpeed?: Range;
  carLightsLength?: Range;
  carLightsRadius?: Range;
  carWidthPercentage?: Range;
  carShiftX?: Range;
  carFloorSeparation?: Range;
  colors?: HyperspeedColors;
}

declare function Hyperspeed(props: { effectOptions?: HyperspeedOptions }): ReactElement;

export default Hyperspeed;
