import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FramedVideo from "@/components/FramedVideo";
import Positioning from "@/components/Positioning";
import Manifesto from "@/components/Manifesto";
import Combos from "@/components/Combos";
import Beneficios from "@/components/Beneficios";
import ArpMovel from "@/components/ArpMovel";
import Presenca from "@/components/Presenca";
import Wifi6 from "@/components/Wifi6";
import Central from "@/components/Central";
import Aplicativo from "@/components/Aplicativo";
import Support from "@/components/Support";
import Faq from "@/components/Faq";
import SocialProof from "@/components/SocialProof";
import InstagramCta from "@/components/InstagramCta";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProgressiveBlur from "@/components/ProgressiveBlur";
import LoadingSplash from "@/components/LoadingSplash";

export default function Home() {
  return (
    <>
      <LoadingSplash />
      <Navbar />
      <main>
        <Hero />
        <FramedVideo />
        <Positioning />
        <Manifesto />
        {/* Credibilidade ANTES do preço: os anos de casa e o que a ARP
            devolve para a região pesam mais lidos antes da tabela de
            planos do que depois dela. */}
        <Presenca />
        <Combos />
        {/* Logo depois dos planos: os dois respondem "o que mais vem
            junto?", pergunta que a tabela de preços acabou de abrir. */}
        <Beneficios />
        <ArpMovel />
        <Wifi6 />
        <Central />
        {/* Logo depois da Central: as duas resolvem a mesma necessidade
            (fatura, suporte, contrato), uma pelo navegador e outra pelo
            celular. Quem não se resolveu ali tem o app na sequência. */}
        <Aplicativo />
        <Support />
        <Faq />
        {/* Antes do SocialProof de propósito: o FinalCta desliza por cima da
            seção imediatamente anterior, e essa seção é curta demais para
            sobreviver a isso — o botão, que fica na base, seria encoberto
            quase o tempo todo. Assim o FinalCta volta a cobrir o SocialProof,
            como antes. */}
        <InstagramCta />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
      <ProgressiveBlur />
      <FloatingWhatsApp />
    </>
  );
}
