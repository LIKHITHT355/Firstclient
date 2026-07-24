import { useState } from "react";
import { Truck, Lock, Mail, User, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { login, signup } from "@/lib/api";

export function AuthPage({ locked, onAuthed }) {
  const [tab, setTab] = useState("login");
  return (
    <div className="auth-shell">
      <div className="auth-card fade-in">
        <div className="auth-logo"><Truck size={22} /></div>
        <h1>{tab === "login" ? "Welcome back" : "Create your account"}</h1>
        <p>{tab === "login" ? `Sign in to continue with ${COMPANY}.` : "Book trucks faster and manage your shipments."}</p>

        {locked && (
          <div className="auth-locked-note" style={{ marginTop: 20 }}>
            Please sign in or create an account to keep browsing.
          </div>
        )}

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Login</button>
          <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Create Account</button>
        </div>

        {tab === "login"
          ? <LoginForm onAuthed={onAuthed} />
          : <SignupForm onAuthed={onAuthed} />}
      </div>
    </div>
  );
}

function Field({ icon, ...props }) {
  return (
    <div className="field">
      <label>{props["aria-label"] || props.placeholder}</label>
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>{icon}</span>}
        <input {...props} className="input" style={{ paddingLeft: icon ? 40 : 14 }} />
      </div>
    </div>
  );
}

function LoginForm({ onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    setBusy(true);
    try {
      await login({ email: email.trim(), password });
      onAuthed && onAuthed();
    } catch (e) {
      setErr(e.message || "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <Field icon={<Mail size={16} />} type="email" placeholder="Email address" aria-label="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      <Field icon={<Lock size={16} />} type="password" placeholder="Password" aria-label="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
      {err && <p className="form-error">{err}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
        {busy ? "Signing in…" : "Login"}
      </button>
      <p className="auth-forgot-note">Forgot your password? Contact us and we'll help you recover it.</p>
    </form>
  );
}

function SignupForm({ onAuthed }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: k === "phone" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (f.name.trim().length < 2) return setErr("Please enter your full name.");
    if (!/^[0-9]{10}$/.test(f.phone)) return setErr("Enter a valid 10-digit phone number.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("Enter a valid email address.");
    if (f.password.length < 6) return setErr("Password must be at least 6 characters.");
    if (f.password !== f.confirm) return setErr("Passwords do not match.");
    setBusy(true);
    try {
      await signup({ name: f.name.trim(), phone: f.phone, email: f.email.trim(), password: f.password });
      onAuthed && onAuthed();
    } catch (e) {
      setErr(e.message || "Signup failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <Field icon={<User size={16} />} placeholder="Full name" value={f.name} onChange={set("name")} autoComplete="name" required />
      <Field icon={<Phone size={16} />} placeholder="10-digit phone" value={f.phone} onChange={set("phone")} inputMode="numeric" required />
      <Field icon={<Mail size={16} />} type="email" placeholder="Email address" value={f.email} onChange={set("email")} autoComplete="email" required />
      <Field icon={<Lock size={16} />} type="password" placeholder="Password (6+ characters)" value={f.password} onChange={set("password")} autoComplete="new-password" required />
      <Field icon={<Lock size={16} />} type="password" placeholder="Confirm password" value={f.confirm} onChange={set("confirm")} autoComplete="new-password" required />
      {err && <p className="form-error">{err}</p>}
      <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
        {busy ? "Creating account…" : "Create Account"}
      </button>
    </form>
  );
}
