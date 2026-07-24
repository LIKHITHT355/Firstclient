import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar, FloatingButtons } from "@/components/Navbar";
import { Hero, Stats, WhyChooseUs } from "@/components/Hero";
import { Services, Vehicles } from "@/components/Services";
import { Process, ContractBanner, Coverage } from "@/components/Process";
import { Testimonials, FAQ } from "@/components/Social";
import { QuoteForm, Contact, Footer } from "@/components/ContactBlock";
import { AuthGate } from "@/components/AuthGate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KarnaTrans Logistics — Goods Transport in Bengaluru & Karnataka" },
      {
        name: "description",
        content: "Reliable Tata ACE and Canter goods transport across Bengaluru and Karnataka. On-demand and contract logistics for businesses.",
      },
      { property: "og:title", content: "KarnaTrans Logistics — Goods Transport in Karnataka" },
      { property: "og:description", content: "Fast, safe & affordable transport for shops, warehouses, manufacturers and distributors." },
    ],
  }),
  component: Home,
});

function Home() {
  const [navKey, setNavKey] = useState(0);
  return (
    <AuthGate>
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <Navbar key={navKey} onLogout={() => setNavKey((k) => k + 1)} />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <Vehicles />
          <Process />
          <Stats />
          <QuoteForm />
          <ContractBanner />
          <Coverage />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingButtons />
        <div className="mobile-spacer" aria-hidden />
      </div>
    </AuthGate>
  );
}
