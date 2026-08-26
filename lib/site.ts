export const site = {
  name: "ARP Fibra",
  /* Data de fundação. O "X anos de mercado" é CALCULADO a partir daqui
     (ver anosDeMercado abaixo) em vez de escrito à mão — número fixo no
     texto envelhece sozinho e vira mentira na virada do aniversário. */
  fundacao: new Date(2013, 5, 13),
  phone0800: "0800 042 0623",
  phoneCell: "(62) 99900-7153",
  whatsapp: "https://wa.me/5562999007153",
  /* ---------------------------------------------------------------
     TROQUE AQUI quando os endereços reais chegarem. São os DOIS únicos
     pontos do site: a Central aparece em 5 lugares (Central, Rodapé x2,
     Suporte) e todos leem daqui.
     Hoje apontam para central.arpfibra.com.br, que NÃO resolve — o
     domínio arpfibra.com.br não está registrado, então esses botões
     estão quebrados para todos os visitantes.
     --------------------------------------------------------------- */
  central: "https://central.arpfibra.com.br",
  boleto: "https://central.arpfibra.com.br",
  instagram: "https://instagram.com/arpfibra",
  address: {
    street: "Rua 21 de Abril — Centro",
    city: "Mambaí — GO",
  },
  hours: {
    week: "Segunda a sexta · 08h às 18h",
    saturday: "Sábado · 08h às 13h",
  },
  nav: [
    { label: "Combos", href: "#combos" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "ARP Móvel", href: "#arp-movel" },
    { label: "Wi-Fi 6", href: "#wifi6" },
    { label: "Central ARP", href: "#central" },
    { label: "Dúvidas", href: "#faq" },
  ],
} as const;

/* Anos completos desde a fundação. Conta pelo mês e dia, não só pelo ano:
   em janeiro de 2027 ainda serão 13 anos, e não 14, porque o aniversário
   é em junho. */
export function anosDeMercado(hoje: Date = new Date()): number {
  const f = site.fundacao;
  let anos = hoje.getFullYear() - f.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < f.getMonth() ||
    (hoje.getMonth() === f.getMonth() && hoje.getDate() < f.getDate());
  if (aindaNaoFezAniversario) anos -= 1;
  return anos;
}

/* Monta o link do WhatsApp já com a mensagem digitada. O wa.me aceita
   ?text=, e a pessoa cai na conversa com o texto pronto — não precisa
   explicar qual plano quer, o que reduz atrito e já qualifica o contato
   para quem atende. encodeURIComponent porque as mensagens têm acento,
   vírgula e espaço. */
export function whatsappCom(mensagem: string): string {
  return site.whatsapp + "?text=" + encodeURIComponent(mensagem);
}
