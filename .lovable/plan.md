## Heads-up on the scaffold

Lovable's platform requires the TanStack Start shell (`src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/start.ts`, `src/server.ts`) — removing it breaks preview and publish. So "full rewrite to Vite + React (JS) + plain CSS" will be applied to **everything you author**: all feature code becomes `.jsx` with hand-written CSS, Tailwind is removed from all our components, and the TanStack files stay as minimal JS wrappers you don't need to touch. The result reads like a plain React + JS + CSS project.

## What changes

### 1. TypeScript → JavaScript
- Convert every file under `src/components/`, `src/hooks/`, `src/lib/` from `.ts/.tsx` to `.js/.jsx`. Strip all type annotations, interfaces, generics.
- Rewrite `src/routes/index.tsx` and `src/routes/__root.tsx` as minimal JS route files (TanStack requires these two).
- Keep `tsconfig.json` (needed by Vite plugin) but nothing new is authored in TS.

### 2. Tailwind → plain CSS
- Remove `@import "tailwindcss"` and all `@utility` / `@theme` blocks from `src/styles.css`.
- Replace with a hand-written stylesheet split into a few files under `src/styles/`:
  - `base.css` — reset, typography, CSS variables (brand colors, spacing, shadows).
  - `layout.css` — container, grid, section spacing, navbar/footer.
  - `components.css` — buttons, cards, forms, modal, floating buttons.
  - `sections.css` — hero, services, vehicles, stats, testimonials, FAQ, contact.
- All class names become plain semantic classes (`.btn-primary`, `.hero`, `.card`, etc.). No utility classes.

### 3. Consolidate components
Group related sections into single files to cut file count roughly in half:

```
src/components/
  Navbar.jsx              (Navbar + FloatingCallButton + BackToTop)
  Hero.jsx                (Hero + Stats strip)
  Services.jsx            (Services + Vehicles + WhyChooseUs)
  Process.jsx             (Process + ContractBanner + Coverage)
  Social.jsx              (Testimonials + FAQ)
  ContactBlock.jsx        (QuoteForm + Contact + Footer)
  AuthPage.jsx            (Login + Signup toggle in one file)
  AuthGate.jsx            (idle timer + route guard wrapper)
```

### 4. Remove WhatsApp
- Delete the WhatsApp button from the floating stack and the mobile sticky bar.
- Delete `WHATSAPP_URL` from `src/lib/constants.js`.
- Sticky bottom bar becomes a single full-width "Call Now" button.

### 5. Blocking auth after 1 minute + real login/signup
- Replace the dismissible `LoginModal` with a full-page `AuthPage` that has **Login** and **Create Account** tabs in one component (fixes the broken create-account UX).
- `AuthGate` wraps the site and:
  - Reads a JWT from `localStorage` on mount; if present, user is authenticated.
  - Starts a 60-second timer on first visit; when it fires and the user isn't authenticated, replaces the whole page with `AuthPage`. Site becomes unusable until sign-in/up succeeds.
  - Once authenticated, the timer is cleared and never re-triggers.
- Signup form: name, phone (10-digit), email, password, confirm password, with inline validation.
- Login form: email (or phone) + password.
- Both submit to your MongoDB backend via a small `src/lib/api.js` client:
  - `POST {API_BASE}/api/auth/signup`
  - `POST {API_BASE}/api/auth/login`
  - Expected response: `{ token, user: { id, name, email } }`.
  - `API_BASE` read from `import.meta.env.VITE_API_BASE_URL` (fallback `http://localhost:5000`). You set this later.
- Token stored in `localStorage` under `auth_token`; `user` under `auth_user`.
- Add a "Logout" button in the Navbar when authenticated.
- Errors from the API are shown inline (e.g. "Email already registered", "Invalid credentials").

### 6. Files removed
`LoginModal.tsx`, `useIdleTimer.ts` (folded into `AuthGate.jsx`), and every per-section `.tsx` listed in the codebase — replaced by the consolidated `.jsx` files above.

## Backend contract you'll implement (MongoDB + Express or similar)

```text
POST /api/auth/signup
  body:    { name, phone, email, password }
  200:     { token, user: { id, name, email, phone } }
  409:     { error: "Email already registered" }

POST /api/auth/login
  body:    { email, password }
  200:     { token, user: { id, name, email, phone } }
  401:     { error: "Invalid credentials" }
```

CORS must allow the Lovable preview origin. Token is treated as opaque by the frontend.

## Out of scope
- No backend code (you're writing it).
- No password reset flow, no email verification, no social login.
- No changes to the visual design language — same colors, same sections, just rebuilt in plain CSS.
