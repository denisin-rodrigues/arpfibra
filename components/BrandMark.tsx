/* Marca autoral da ARP — arco de sinal/onda de fibra.
   (Marca de interface simples desenhada em SVG — permitido.) */
export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="ARP Fibra"
      fill="none"
    >
      <defs>
        <linearGradient id="arp-arc" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7D43" />
          <stop offset="1" stopColor="#D8410F" />
        </linearGradient>
        <radialGradient id="arp-ring" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#E9A23B" />
          <stop offset="1" stopColor="#B87A22" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18.5" stroke="url(#arp-ring)" strokeWidth="2" opacity="0.55" />
      {/* Ondas de sinal */}
      <path d="M20 27a7 7 0 0 0 7-7" stroke="url(#arp-arc)" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M20 21a1 1 0 0 0 1-1" stroke="url(#arp-arc)" strokeWidth="3.4" strokeLinecap="round" transform="translate(-0.5 0)" />
      <path d="M13 20a7 7 0 0 1 7-7 7 7 0 0 1 6 3.5" stroke="url(#arp-arc)" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />
      <circle cx="20" cy="20" r="2.3" fill="#FF7D43" />
    </svg>
  );
}
