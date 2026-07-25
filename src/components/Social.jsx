import { useState } from "react";
import { ChevronDown } from "lucide-react";

const reviews = [
  { name: "Ravi K.", role: "Wholesale distributor, Hosur ", text: "GLR has been moving our stock daily for two years. Not one late delivery. Their drivers are polite and careful." },
  { name: "Priya S.", role: "Ops manager, Bommasandra factory", text: "We switched to their contract fleet and cut logistics cost by 20%. Booking is just one phone call now." },
  { name: "Anand M.", role: "Retail chain owner, Bommasandra", text: "Whether it's a Tata ACE for a single crate or a Canter across the state, they handle it. Fair pricing, no hidden fees." },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">What clients say</span>
        <h2 className="section-title">Trusted by businesses in every industry</h2>
        <div className="grid grid-3" style={{ marginTop: 32 }}>
          {reviews.map((r) => (
            <div key={r.name} className="tcard">
              <p>“{r.text}”</p>
              <footer>
                <div className="tavatar">{r.name[0]}</div>
                <div>
                  <div className="tname">{r.name}</div>
                  <div className="trole">{r.role}</div>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Which areas do you serve?", a: "We operate all across Industrial area Bommasandra —Regular routes cover Jigani, Electronic City, Attibele, Chandapura, Anekal and more." },
  { q: "How quickly can I get a vehicle?", a: "For city bookings, typically within 30–60 minutes. For outstation trips, same-day pickup is available if booked before noon." },
  { q: "Do you offer contract logistics?", a: "Yes — monthly and yearly contracts with dedicated fleet, invoiced billing, and account managers. Contact us for a custom proposal." },
  { q: "How is pricing calculated?", a: "By vehicle type, distance, and load. We give a fixed all-inclusive quote before dispatch — no hidden charges." },
  { q: "Are the vehicles insured?", a: "Yes, all vehicles carry commercial goods-in-transit insurance and our drivers are trained and background-verified." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-cloud">
      <div className="container" style={{ maxWidth: 820 }}>
        <span className="eyebrow">FAQ</span>
        <h2 className="section-title">Everything you might be wondering</h2>
        <div style={{ marginTop: 32 }}>
          {faqs.map((f, i) => (
            <div key={f.q} className="faq-item">
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <ChevronDown size={20} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
              </button>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
