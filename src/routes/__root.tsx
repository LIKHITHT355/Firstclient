import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const shellStyle: React.CSSProperties = {
  display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center",
  padding: "16px", background: "#fff", color: "#0F172A", fontFamily: "'Inter', system-ui, sans-serif",
};
const btnStyle: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  padding: "10px 18px", borderRadius: 999, background: "#F97316", color: "#fff",
  fontWeight: 600, fontSize: 14, textDecoration: "none", border: 0, cursor: "pointer",
};
const ghostBtn: React.CSSProperties = { ...btnStyle, background: "#fff", color: "#0F172A", border: "1px solid rgba(15,23,42,0.12)" };

function NotFoundComponent() {
  return (
    <div style={shellStyle}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 72, fontWeight: 800 }}>404</h1>
        <h2 style={{ marginTop: 12, fontSize: 20, fontWeight: 600 }}>Page not found</h2>
        <p style={{ marginTop: 8, color: "#475569", fontSize: 14 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link to="/" style={btnStyle}>Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div style={shellStyle}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>This page didn't load</h1>
        <p style={{ marginTop: 8, color: "#475569", fontSize: 14 }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          <button onClick={() => { router.invalidate(); reset(); }} style={btnStyle}>Try again</button>
          <a href="/" style={ghostBtn}>Go home</a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KarnaTrans Logistics — Goods Transport in Bengaluru & Karnataka" },
      { name: "description", content: "Reliable goods transport across Bengaluru and Karnataka. Tata ACE, Canter, on-demand and contract logistics for businesses." },
      { property: "og:title", content: "KarnaTrans Logistics — Goods Transport in Karnataka" },
      { property: "og:description", content: "Fast, safe & affordable transport for shops, warehouses, manufacturers and distributors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
