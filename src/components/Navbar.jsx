import { useEffect, useState } from "react";
import { Menu, X, Phone, Truck, ArrowUp, LogOut } from "lucide-react";
import { TEL_URL, COMPANY } from "@/lib/constants";
import { isAuthenticated, logout, getUser } from "@/lib/api";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#vehicles", label: "Vehicles" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authed, setAuthed] = useState(isAuthenticated());
  const user = getUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLogout = () => {
    logout();
    setAuthed(false);
    if (onLogout) onLogout();
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand">
          <span className="brand-logo"><Truck size={18} /></span>
          <span>{COMPANY}</span>
        </a>

        <nav className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          {authed ? (
            <button onClick={handleLogout} className="btn btn-ghost call-desktop" title={user ? `Signed in as ${user.name || user.email}` : "Sign out"}>
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <a href={TEL_URL} className="btn btn-primary call-desktop">
              <Phone size={16} /> Call Now
            </a>
          )}
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div className="mobile-backdrop" onClick={() => setOpen(false)} />
          <nav className="mobile-menu fade-in">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            {authed ? (
              <button onClick={() => { setOpen(false); handleLogout(); }} className="btn btn-ghost btn-block" style={{ marginTop: 8 }}>
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <a href={TEL_URL} className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
                <Phone size={18} /> Call Now
              </a>
            )}
          </nav>
        </>
      )}
    </header>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="float-stack">
        <a href={TEL_URL} aria-label="Call" className="float-btn float-call">
          <Phone size={22} />
        </a>
        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="float-btn float-top">
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      <div className="mobile-cta">
        <div className="mobile-cta-inner">
          <a href={TEL_URL} className="btn btn-primary">
            <Phone size={18} /> Call Now
          </a>
        </div>
      </div>
    </>
  );
}
