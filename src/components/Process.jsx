import { FileText, Truck, MapPin } from "lucide-react";
import { TEL_URL } from "@/lib/constants";

const steps = [
  { n: 1, title: "Share your requirement", desc: "Call, WhatsApp, or fill our quote form — tell us the load, route and timing." },
  { n: 2, title: "Get an instant quote", desc: "We propose the right vehicle and a transparent price within minutes." },
  { n: 3, title: "Pickup & delivery", desc: "Our driver arrives on time, loads carefully, and delivers with proof of delivery." },
];

export function Process() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">Booking a truck takes 3 minutes</h2>
        <div className="grid grid-3" style={{ marginTop: 32 }}>
          {steps.map((s) => (
            <div key={s.n} className="process-step">
              <div className="step-num">{s.n}</div>
              <h3 style={{ fontSize: 18 }}>{s.title}</h3>
              <p style={{ color: "var(--muted)", marginTop: 6, fontSize: 14 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContractBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="banner">
          <div>
            <span className="eyebrow" style={{ color: "#fdba74" }}>For businesses</span>
            <h2>Long-term contracts, predictable costs</h2>
            <p>Lock in a dedicated fleet with monthly and yearly contracts. Priority dispatch, invoiced billing, and named account managers.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>

            <a href={TEL_URL} className="btn btn-ghost" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>Talk to us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const areas = ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Tumakuru", "Shivamogga", "Vijayapura", "Udupi"];

export function Coverage() {
  return (
    <section className="section section-cloud">
      <div className="container">
        <span className="eyebrow">Coverage</span>
        <h2 className="section-title">Across every district of Karnataka</h2>
        <p className="section-sub">Regular routes to every major city and town. If you don't see your area, just ask — we probably cover it.</p>
        <div className="chip-list">
          {areas.map((a) => <span key={a} className="chip"><MapPin size={14} style={{ display: "inline", marginRight: 4, color: "var(--orange)" }} />{a}</span>)}
        </div>
      </div>
    </section>
  );
}
