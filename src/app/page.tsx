import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Adventures } from "@/components/Adventures";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <InteractiveMap />
      <Adventures />
      <Services />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <About />
      <LeadForm />
      <Footer />
    </main>
  );
}
