import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WhyKazakhstan } from "@/components/WhyKazakhstan";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Adventures } from "@/components/Adventures";
import { Storytelling } from "@/components/Storytelling";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Pricing } from "@/components/Pricing";
import { Destinations } from "@/components/Destinations";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { About } from "@/components/About";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <WhyKazakhstan />
      <InteractiveMap />
      <Adventures />
      <Storytelling />
      <Services />
      <Destinations />
      <WhyUs />
      <Pricing />
      <Testimonials />
      <About />
      <Faq />
      <LeadForm />
      <Footer />
    </main>
  );
}
