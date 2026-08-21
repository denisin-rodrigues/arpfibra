/* O componente é .jsx (mantido igual ao upstream do React Bits). Sem estas
   declarações o TypeScript infere os props a partir dos valores padrão e passa
   a exigir todas as chaves em qualquer configuração parcial. */
import type { ReactElement } from "react";

export interface LightfallProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: readonly string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: string;
}

declare function Lightfall(props: LightfallProps): ReactElement;

export default Lightfall;
