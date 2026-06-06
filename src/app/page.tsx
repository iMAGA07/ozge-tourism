import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { MapSection } from "@/components/MapSection";
import { Adventures } from "@/components/Adventures";
import { Services } from "@/components/Services";
import { HorseSchool } from "@/components/HorseSchool";
import { WhyUs } from "@/components/WhyUs";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { ContactDock } from "@/components/ContactDock";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <Marquee />
      <MapSection />
      <Adventures />
      <Services />
      <HorseSchool />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <About />
      <LeadForm />
      <Footer />
      <ContactDock />
    </main>
  );
}
