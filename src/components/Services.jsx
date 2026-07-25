import { Package, MapPin, Building2, Truck } from "lucide-react";

const services = [
  { icon: <MapPin size={22} />, title: "City transport in Bengaluru Industrial Area", desc: "Same-day pickup and delivery within the city — shops, warehouses, offices." },
  { icon: <Building2 size={22} />, title: "Business contracts", desc: "Monthly and yearly logistics contracts with dedicated fleet allocation." },
  { icon: <Truck size={22} />, title: "On-demand loading", desc: "Book a truck in under 30 minutes for urgent shipments and last-mile jobs." },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <span className="eyebrow">Our services</span>
        <h2 className="section-title">Transport built around your business</h2>
        <p className="section-sub">From single-trip deliveries to full-fleet contracts — one partner for every logistics need.</p>
        <div className="grid grid-4" style={{ marginTop: 32 }}>
          {services.map((s) => (
            <div key={s.title} className="card">
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const vehicles = [
  { title: "Tata ACE (4-Wheeler)", capacity: "750 kg", volume: "6x5x5 ft", desc: "Nimble cargo mini-truck ideal for city loads and narrow lanes." },
  { title: "Canter (6-Wheeler)", capacity: "3-5 tons", volume: "14x7x7 ft", desc: "Medium-duty truck for inter-district and factory-to-warehouse runs." },
  { title: "Heavy Vehicles", capacity: "10+ tons", volume: "20+ ft", desc: "Larger trucks for bulk shipments and contract logistics." },
];

export function Vehicles() {
  return (
    <section id="vehicles" className="section section-cloud">
      <div className="container">
        <span className="eyebrow">Our fleet</span>
        <h2 className="section-title">The right vehicle for every shipment</h2>
        <p className="section-sub">All vehicles are regularly serviced, GPS-enabled, and driven by trained, verified operators.</p>
        <div className="grid grid-3" style={{ marginTop: 32 }}>
          {vehicles.map((v) => (
            <div key={v.title} className="card vehicle-card">
              <div className="card-icon"><Truck size={26} /></div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
              <div className="vehicle-specs">
                <span>{v.capacity}</span>
                <span>{v.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
