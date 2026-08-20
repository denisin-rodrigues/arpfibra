import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FramedVideo from "@/components/FramedVideo";
import Positioning from "@/components/Positioning";
import Manifesto from "@/components/Manifesto";
import Combos from "@/components/Combos";
import Wifi6 from "@/components/Wifi6";
import Central from "@/components/Central";
import Support from "@/components/Support";
import Faq from "@/components/Faq";
import SocialProof from "@/components/SocialProof";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProgressiveBlur from "@/components/ProgressiveBlur";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FramedVideo />
        <Positioning />
        <Manifesto />
        <Combos />
        <Wifi6 />
        <Central />
        <Support />
        <Faq />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
      <ProgressiveBlur />
      <FloatingWhatsApp />
    </>
  );
}
