// Auth API client — talks to your MongoDB-backed backend.
// Set VITE_API_BASE_URL in your env; falls back to localhost for dev.

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  "http://localhost:5000";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

async function request(path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error("Cannot reach server. Please check your connection.");
  }
  let data = {};
  try { data = await res.json(); } catch (_) { }
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function signup({ name, phone, email, password }) {
  const data = await request("/api/auth/signup", { name, phone, email, password });
  if (data.token) saveSession(data.token, data.user);
  return data;
}

export async function login({ email, password }) {
  const data = await request("/api/auth/login", { email, password });
  if (data.token) saveSession(data.token, data.user);
  return data;
}

export function saveSession(token, user) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (_) { }
}

export function getToken() {
  try { return localStorage.getItem(TOKEN_KEY); } catch (_) { return null; }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) { return null; }
}

export function logout() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (_) { }
}

export function isAuthenticated() {
  return !!getToken();
}
