# ARP Fibra — Site institucional premium

Site de conversão para provedor de fibra óptica, construído em **Next.js 16 (App Router) + TypeScript + Tailwind v4**, com animações **GSAP + Lenis** (scroll suave) e ícones **Solar (Iconify)**.

## Rodar

```bash
npm run dev      # desenvolvimento — http://localhost:3000
npm run build    # build de produção
npm run start    # servir o build
```

## Conceito visual

Fibra óptica = luz viajando no vidro. Base quase-preta (`#08080a`) com laranja ARP (`#ff5a1e`) como "a luz" que corre pela página. Tokens de design em [`app/globals.css`](app/globals.css) (bloco `@theme`).

## Estrutura das seções (`app/page.tsx`)

| # | Seção | Componente | Destaque técnico |
|---|-------|-----------|------------------|
| 01 | Hero | `Hero.tsx` | Vídeo de fundo + intro GSAP |
| 02 | Mascote/vídeo | `FramedVideo.tsx` | **Frame que expande no scroll** (pin + scrub) |
| 03 | Posicionamento | `Positioning.tsx` | 4 cards + reveal por palavra |
| 04 | Manifesto | `Manifesto.tsx` | Texto que acende no scroll |
| 05 | Planos | `Plans.tsx` | 3 cards, 500 Mega em destaque |
| 06 | Combos | `Combos.tsx` | Chips de velocidade |
| 07 | Wi-Fi 6 | `Wifi6.tsx` | Roteador com ondas animadas |
| 08 | Central ARP | `Central.tsx` | 4 serviços |
| 09 | Suporte | `Support.tsx` | Canais de atendimento |
| 10 | FAQ | `Faq.tsx` | Accordion + JSON-LD (SEO) |
| 11 | Prova social | `SocialProof.tsx` | Depoimentos (sem fotos falsas) |
| 12 | CTA final | `FinalCta.tsx` | Fechamento |
| — | Footer | `Footer.tsx` | Contatos + LocalBusiness JSON-LD |

## ⚠️ Assets para substituir

- **`public/hero-principal.mp4`** — vídeo do hero (já incluído; personagem apontando para os CTAs).
- **Seção 02 (`FramedVideo.tsx`)** — atualmente **reusa o vídeo do hero como placeholder**. Coloque o vídeo do "mascote no sofá" em `public/mascote-sofa.mp4` e troque o `src` no componente (há um comentário marcando o ponto).
- **Links externos** — `lib/site.ts` centraliza WhatsApp, telefones, Central do Assinante e endereço. Ajuste a URL da Central (`site.central`) e o `metadataBase` em `app/layout.tsx` para o domínio real.

## Acessibilidade e performance

- Respeita `prefers-reduced-motion` (desliga scroll suave e animações scrubbed).
- Primeiro frame do hero completo sem JS/vídeo.
- Títulos animados mantêm o nome acessível completo (`aria-label`).
- Uma única engine de scroll (Lenis) conectada ao ScrollTrigger, com cleanup.
