import Image from "next/image";
import { Icon } from "@iconify/react";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Planos",
    links: [{ label: "Combos", href: "#combos" }],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Central do Assinante", href: site.central },
      { label: "Suporte técnico", href: site.whatsapp },
      { label: "2ª via de boleto", href: site.central },
      { label: "Teste de velocidade", href: "https://www.speedtest.net" },
      { label: "WhatsApp", href: site.whatsapp },
    ],
  },
];

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "InternetServiceProvider",
  name: "ARP Fibra",
  description: "Internet de fibra óptica para casa e empresa.",
  telephone: ["0800 042 0623", "+55 62 99900-7153"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua 21 de Abril — Centro",
    addressLocality: "Mambaí",
    addressRegion: "GO",
    addressCountry: "BR",
  },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-13:00"],
  url: "https://arpfibra.com.br",
};

export default function Footer() {
  return (
    <footer
      className="section-orange relative pt-14"
      style={{ background: "linear-gradient(160deg, #e0430f 0%, #b8360b 100%)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            {/* Versão branca: o rodapé tem fundo laranja sólido, onde a logo
                colorida perde contraste. width/height são as dimensões reais
                do arquivo (169x76) — o next/image usa esses valores para gerar
                o srcset e reservar o espaço, então destoar deles desalinha o
                layout antes da imagem carregar. */}
            <Image
              src="/logo-branca.png"
              alt="ARP Fibra"
              width={169}
              height={76}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-dim">
              Internet para conectar tudo o que importa.
            </p>
          </div>

          {/* Colunas de links */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-text">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("#") ? undefined : "_blank"}
                      rel={l.href.startsWith("#") ? undefined : "noopener noreferrer"}
                      className="text-sm text-text-dim transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contato + horário */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-text">Contato</h3>
            <ul className="space-y-3 text-sm text-text-dim">
              <li>
                <a href="tel:08000420623" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Icon icon="solar:phone-calling-bold-duotone" className="text-white" />
                  <span className="font-semibold text-text">{site.phone0800}</span>
                </a>
              </li>
              <li>
                <a href="tel:+5562999007153" className="flex items-center gap-2 transition-colors hover:text-white">
                  <Icon icon="solar:chat-round-call-bold-duotone" className="text-white" />
                  <span className="font-semibold text-text">{site.phoneCell}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Icon icon="solar:map-point-bold-duotone" className="mt-0.5 shrink-0 text-white" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}
                </span>
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-text">Horário</h3>
            <ul className="space-y-1.5 text-sm text-text-dim">
              <li className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold-duotone" className="text-white" />
                {site.hours.week}
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold-duotone" className="text-white" />
                {site.hours.saturday}
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé legal — z acima do ProgressiveBlur (fixo na base da
            tela) para o texto não ficar borrado na última seção. */}
        <div className="relative z-[1000] mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-sm text-text-faint sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#" className="transition-colors hover:text-text">Política de Privacidade</a>
            <a href="#" className="transition-colors hover:text-text">Termos de Uso</a>
            <a href="#" className="transition-colors hover:text-text">LGPD</a>
          </div>
          <p className="text-center sm:text-right">
            © 2026 ARP Fibra. Todos os direitos reservados.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/stories/denisin.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-2 transition-colors hover:underline"
            >
              @denisin.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
