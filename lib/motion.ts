/* Política de movimento do site — um único lugar para decidir se
   `prefers-reduced-motion: reduce` desliga as animações.

   Está DESLIGADO por escolha do dono do site. Motivo: todo o movimento
   daqui é atrelado ao scroll (scrub ou entrada por ScrollTrigger) — nada
   se move sozinho, só reagindo ao gesto de quem está rolando a página.
   Ainda assim, isto é uma decisão de acessibilidade: quem marcou a
   preferência no sistema passa a ver as animações mesmo assim.

   Para voltar a respeitar a preferência do sistema, basta trocar esta
   constante para `true` — todos os componentes leem daqui. */
export const RESPECT_REDUCED_MOTION = false;

export function prefersReducedMotion(): boolean {
  if (!RESPECT_REDUCED_MOTION) return false;
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
