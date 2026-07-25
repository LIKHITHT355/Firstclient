import { useState } from "react";
import { Phone, Mail, MapPin, Send, Truck } from "lucide-react";
import { COMPANY, PHONE_DISPLAY, TEL_URL, EMAIL, ADDRESS } from "@/lib/constants";

export function QuoteForm() {
  const [f, setF] = useState({ name: "", phone: "", pickup: "", drop: "", vehicle: "Tata ACE", note: "" });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Please enter your name.");
    if (!/^[0-9]{10}$/.test(f.phone)) return setErr("Enter a valid 10-digit phone number.");
    if (!f.pickup.trim() || !f.drop.trim()) return setErr("Pickup and drop locations are required.");
    setErr(null);
    setMsg("Thanks! We'll call you back within 15 minutes with a quote.");
    setF({ name: "", phone: "", pickup: "", drop: "", vehicle: "Tata ACE", note: "" });
    setTimeout(() => setMsg(null), 5000);
  };

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <section id="quote" className="section">
      <div className="container">
        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <span className="eyebrow">Get a quote</span>
            <h2 className="section-title">Tell us about your shipment</h2>
            <p className="section-sub">Call now for conform booking</p>
            <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
              <div className="contact-item">
                <div className="card-icon"><Phone size={20} /></div>
                <div><strong>Call us</strong><span>{PHONE_DISPLAY}</span></div>
              </div>
              <div className="contact-item">
                <div className="card-icon"><Mail size={20} /></div>
                <div><strong>Email</strong><span>{EMAIL}</span></div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section section-cloud">
      <div className="container">
        <span className="eyebrow">Contact</span>
        <h2 className="section-title">Reach us any time</h2>
        <div className="contact-grid" style={{ marginTop: 32 }}>
          <div className="contact-info">
            <div className="contact-item">
              <div className="card-icon"><Phone size={20} /></div>
              <div><strong>Phone</strong><span><a href={TEL_URL}>{PHONE_DISPLAY}</a></span></div>
            </div>
            <div className="contact-item">
              <div className="card-icon"><Mail size={20} /></div>
              <div><strong>Email</strong><span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
            </div>
            <div className="contact-item">
              <div className="card-icon"><MapPin size={20} /></div>
              <div><strong>Office</strong><span>{ADDRESS}</span></div>
            </div>
          </div>
          <div className="card">
            <h3>Business hours</h3>
            <p style={{ marginTop: 8 }}>Monday – Saturday: 7:00 AM – 9:00 PM</p>
            <p>Sunday: On-call only</p>
            <p style={{ marginTop: 12, color: "var(--muted)", fontSize: 13 }}>Emergency and contract clients: 24/7 support.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "#fff" }}>
              <span className="brand-logo" style={{ background: "var(--orange)" }}><Truck size={18} /></span>
              <span>{COMPANY}</span>
            </div>
            <p style={{ marginTop: 12, fontSize: 14, maxWidth: 380 }}>
              Commercial transportation across Bengaluru . Ten years of moving your goods safely, on time.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>City transport</li>
              <li>Contract logistics</li>
              <li>On-demand booking</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={TEL_URL}>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li>{ADDRESS}</li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
