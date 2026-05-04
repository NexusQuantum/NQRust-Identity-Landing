"use client";

import Image from "next/image";
import { ShortVideo } from "./short-video";
import { ArchDiagram } from "./arch-diagram";
import { Check, Download, Key, ShieldCheck, Smartphone, Terminal } from "lucide-react";
import { IconWhatsApp } from "./icons";
import { DOWNLOADS, WA_URL } from "@/lib/constants";

/* ───────────────────────────────────────────
   1. Trust Bar — BIN
   ─────────────────────────────────────────── */
export function TrustBar() {
  return (
    <section className="trust-bar">
      <div className="container-x trust-bar-inner">
        <div className="trust-bar-label">Trusted by strategic institutions</div>
        <div className="trust-bar-logos">
          <div className="trust-logo">
            <Image
              src="/assets/bin.png"
              alt="Badan Intelijen Negara"
              width={56}
              height={56}
              className="trust-logo-img"
            />
            <div className="trust-logo-text">
              <span className="trust-logo-name">Badan Intelijen Negara</span>
              <span className="trust-logo-sub">Airgapped deployment</span>
            </div>
          </div>
          <div className="trust-bar-label" style={{ color: "var(--color-text-faint)" }}>
            More partners on request
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   2. Problem
   ─────────────────────────────────────────── */
export function Problem() {
  const items = [
    {
      title: "Data sent abroad",
      body: "Cloud IAM vendors store sensitive identity data in foreign jurisdictions.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
      ),
    },
    {
      title: "Per-user pricing in USD",
      body: "Bills balloon with team growth. FX swings make budgets unpredictable.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Internet-dependent",
      body: "Cloud-only services don't fit airgapped, intelligence, or critical-infra setups.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01M2 2l20 20" />
        </svg>
      ),
    },
    {
      title: "Third-party authenticators",
      body: "Users install Google or Microsoft Authenticator — no branding, no policy control.",
      icon: <Smartphone size={18} strokeWidth={2} />,
    },
    {
      title: "Self-hosted is hard",
      body: "Other open-source IAMs need months of specialist work to deploy and maintain.",
      icon: <Terminal size={18} strokeWidth={2} />,
    },
  ];
  return (
    <section className="section-pad" id="problem">
      <div className="container-x">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">
            <span className="dot" />
            Why this exists
          </span>
          <h2>Identity management today is broken.</h2>
          <p>
            Enterprise IT teams deal with the same five problems. NQRust Identity is built to solve
            all of them.
          </p>
        </div>
        <div className="problem-grid reveal-group" data-reveal="">
          {items.map((it) => (
            <div className="problem-card" key={it.title}>
              <div className="problem-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   3. Solution 4-in-One (with V1 video)
   ─────────────────────────────────────────── */
export function Solution() {
  const cards = [
    {
      icon: <Key size={20} />,
      title: "Identity Server",
      sub: "OIDC · OAuth2 · SAML",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Identity Portal",
      sub: "Branded admin & user UX",
    },
    {
      icon: <Smartphone size={20} />,
      title: "NQRust Auth",
      sub: "Mobile authenticator",
    },
    {
      icon: <Terminal size={20} />,
      title: "Installer",
      sub: "TUI · airgapped-ready",
    },
  ];
  return (
    <section
      className="section-pad"
      id="solution"
      style={{
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-x">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">
            <span className="dot" />
            Solution
          </span>
          <h2>One stack. Four components. One installer.</h2>
          <p>
            NQRust Identity isn't just an SSO server. You get a complete identity ecosystem —
            server, portal, mobile authenticator, and installer — all built to work together.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            width: "100%",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-md)",
            padding: 24,
          }}
        >
          <ArchDiagram />
        </div>

        <div
          className="solution-cards reveal-group"
          data-reveal=""
        >
          {cards.map((c) => (
            <div
              key={c.title}
              style={{
                padding: 20,
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                background: "var(--color-surface)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--color-primary-soft)",
                  color: "var(--color-primary-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,107,26,0.25)",
                }}
              >
                {c.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{c.title}</div>
              <div
                style={{
                  fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                  fontSize: 11,
                  color: "var(--color-text-muted)",
                }}
              >
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   4. USP #1 — Mobile Auth (V2 vertical)
   ─────────────────────────────────────────── */
export function UspMobile() {
  return (
    <section className="section-pad" id="usp-mobile">
      <div className="container-x">
        <div className="usp">
          <div className="usp-text" data-reveal="">
            <span className="eyebrow">
              <span className="dot" />
              USP #1 · Mobile
            </span>
            <h2>NQRust ships its own 2FA app.</h2>
            <p>
              Most identity vendors push users to Google or Microsoft Authenticator. NQRust comes
              with <strong>NQRust Auth</strong> — a first-party, offline-first authenticator built
              for the same stack as the server. One vendor, one support line, one experience.
            </p>

            <div className="usp-bullets">
              {[
                "First-party app — built and maintained by NQRust, not a third-party dependency",
                "Offline-first — TOTP/HOTP codes generate without internet, ever",
                "AES-256 encrypted local backup",
                "PIN app lock — secure local storage",
                "TOTP / HOTP RFC 6238 & 4226 compliant",
                "Free APK download, no account required",
              ].map((b) => (
                <div className="usp-bullet" key={b}>
                  <span className="check">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="usp-comparison">
              <div className="usp-comparison-row head">
                <div>Aspect</div>
                <div>Third-party authenticator</div>
                <div>NQRust Auth</div>
              </div>
              {[
                ["Vendor", "Google / Microsoft / others", "Same stack as your IAM"],
                ["Support line", "External — not the IAM vendor", "NQRust handles end-to-end"],
                ["Server dependency", "Some sync to vendor cloud", "None — pure offline"],
              ].map(([label, bad, good]) => (
                <div className="usp-comparison-row" key={label}>
                  <div>{label}</div>
                  <div className="col-bad">{bad}</div>
                  <div className="col-good">{good}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="phone-frame">
            <ShortVideo
              src="v2-mobile-auth"
              aspectRatio="1268/2756"
              objectFit="cover"
              caption="NQRust Auth"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   5. USP #2 — Portal Branded (V3)
   ─────────────────────────────────────────── */
export function UspPortal() {
  return (
    <section
      className="section-pad"
      id="usp-portal"
      style={{
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-x">
        <div className="usp reverse">
          <div className="laptop-frame">
            <div className="laptop-chrome">
              <div className="dotc" />
              <div className="dotc" />
              <div className="dotc" />
              <span className="label">portal.your-company.com</span>
            </div>
            <ShortVideo src="v3-portal-tour" aspectRatio="1280/720" objectFit="cover" />
          </div>

          <div className="usp-text" data-reveal="">
            <span className="eyebrow">
              <span className="dot" />
              USP #2 · Portal
            </span>
            <h2>A portal that feels like your own product.</h2>
            <p>
              Not a generic login page. Not the default vendor admin UI. NQRust Identity Portal is a
              modern web app you can fully white-label, built on Next.js 16 + React 19 — UX on par
              with top-tier enterprise SaaS.
            </p>

            <div className="usp-bullets">
              {[
                "Full custom branding — logo, colors, copy",
                "User dashboard: profile, sessions, 2FA devices, audit",
                "License management built in",
                "Admin tools for IT operators",
                "Mobile-responsive, dark/light mode",
              ].map((b) => (
                <div className="usp-bullet" key={b}>
                  <span className="check">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   6. USP #3 — Self-Hosted & Airgapped (V4)
   ─────────────────────────────────────────── */
export function UspAirgapped() {
  return (
    <section className="section-pad" id="usp-airgapped">
      <div className="container-x">
        <div className="usp">
          <div className="usp-text" data-reveal="">
            <span className="eyebrow">
              <span className="dot" />
              USP #3 · Self-Hosted
            </span>
            <h2>Your data. Your servers. Your control.</h2>
            <p>
              Identity data is too sensitive to delegate. NQRust deploys 100% on-premise and
              supports fully airgapped installs for the most sensitive environments.
            </p>

            <div className="usp-bullets">
              {[
                "100% on-premise — every byte stays on your servers",
                "Airgapped mode — single 3.5 GB binary, no internet required",
                "Zero outbound telemetry by default",
                "Your backup, your disaster recovery",
              ].map((b) => (
                <div className="usp-bullet" key={b}>
                  <span className="check">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="laptop-frame">
            <div className="laptop-chrome">
              <div className="dotc" />
              <div className="dotc" />
              <div className="dotc" />
              <span className="label">nqrust-installer · zsh</span>
            </div>
            <ShortVideo src="v4-airgapped-install" aspectRatio="1280/720" objectFit="cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   7. USP #4 — Made in Indonesia · TKDN
   ─────────────────────────────────────────── */
export function UspIndonesia() {
  return (
    <section
      className="section-pad"
      id="usp-tkdn"
      style={{
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-x">
        <div className="usp">
          <div className="usp-text" data-reveal="">
            <span className="eyebrow">
              <span className="dot" />
              USP #4 · 🇮🇩 Local
            </span>
            <h2>Made in Indonesia. 100% TKDN.</h2>
            <p>
              Built by an Indonesian engineering team. Fully TKDN-compliant, ready for government
              and SOE procurement, and aligned with national data sovereignty policy.
            </p>

            <div className="usp-bullets">
              {[
                "100% TKDN — eligible for government & SOE procurement",
                "Local support team in Bahasa Indonesia, Indonesia time zone",
                "Full data residency under Indonesian jurisdiction",
                "Aligned with national data sovereignty policy",
                "Roadmap influenced directly by local customers",
              ].map((b) => (
                <div className="usp-bullet" key={b}>
                  <span className="check">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tkdn-card">
            <div className="tkdn-card-glow" aria-hidden="true" />
            <Image
              src="/assets/tkdn.png"
              alt="Sertifikat TKDN — Tingkat Komponen Dalam Negeri"
              width={320}
              height={320}
              className="tkdn-img"
            />
            <div className="tkdn-eyebrow">Sertifikat TKDN · 100%</div>
            <div className="tkdn-headline">
              Identity you control — not rented from abroad.
            </div>
            <div className="tkdn-badges">
              <span className="badge badge-orange">Government-ready</span>
              <span className="badge badge-orange">BUMN-ready</span>
              <span className="badge badge-orange">Local support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   8. Security Overview (3 columns)
   ─────────────────────────────────────────── */
export function SecurityOverview() {
  const cols = [
    {
      title: "Encryption",
      items: [
        "TLS 1.3 in transit (auto-renew)",
        "AES-256 at rest",
        "PBKDF2 / Argon2 password hashing",
      ],
    },
    {
      title: "Access Control",
      items: [
        "MFA enforced via NQRust Auth",
        "RBAC + ABAC fine-grained policies",
        "Short-lived access + rotating refresh tokens",
      ],
    },
    {
      title: "Audit & Isolation",
      items: [
        "Full audit trail — login, permission, admin actions",
        "Session management & device tracking",
        "Zero outbound telemetry — airgap-safe by default",
      ],
    },
  ];
  return (
    <section className="section-pad" id="security">
      <div className="container-x">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">
            <span className="dot" />
            Security
          </span>
          <h2>Defense in depth, by default.</h2>
          <p>
            Strong security with no extra configuration. Standards: OIDC, OAuth2, SAML 2.0, RFC
            6238, RFC 4226.
          </p>
        </div>

        <div className="security-grid reveal-group" data-reveal="">
          {cols.map((c) => (
            <div className="security-col" key={c.title}>
              <h3>{c.title}</h3>
              <div className="security-list">
                {c.items.map((it) => (
                  <div className="security-item" key={it}>
                    <span className="ico">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   9. Comparison vs Cloud IAM
   ─────────────────────────────────────────── */
export function Comparison() {
  const rows: [string, string, string][] = [
    ["Data location", "Foreign servers", "Your servers, in Indonesia"],
    ["TKDN compliance", "—", "100%"],
    ["Airgapped mode", "Not available", "Built-in"],
    ["Mobile authenticator", "Third-party app", "First-party (NQRust Auth)"],
    ["Portal customization", "Limited / paid tier", "Full custom, included"],
    ["Pricing model", "Per-user-per-month, USD", "Flat annual, IDR"],
    ["Vendor lock-in", "High (proprietary API)", "Low (open standards)"],
    ["Support", "Global ticket portal", "Local, Bahasa Indonesia"],
    ["Data sovereignty", "Foreign jurisdiction", "Indonesian jurisdiction"],
  ];
  return (
    <section
      className="section-pad"
      id="comparison"
      style={{
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-x">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">
            <span className="dot" />
            Comparison
          </span>
          <h2>NQRust vs cloud IAM.</h2>
          <p>
            How NQRust Identity stacks up against international cloud IAM platforms on what matters
            to local teams.
          </p>
        </div>

        <div className="compare-table">
          <div className="compare-row head">
            <div>Aspect</div>
            <div>Cloud IAM (foreign)</div>
            <div className="nqrust-col">NQRust Identity</div>
          </div>
          {rows.map(([label, other, nqrust]) => (
            <div className="compare-row" key={label}>
              <div className="label-col">{label}</div>
              <div className="other-col">{other}</div>
              <div className="nqrust-col">{nqrust}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   10. Use Cases (6 industries)
   ─────────────────────────────────────────── */
export function UseCases() {
  const items = [
    {
      icon: "🏛️",
      title: "Government & SOE",
      body: "SSO for internal applications. Aligned with TKDN and data sovereignty policy.",
    },
    {
      icon: "🏦",
      title: "Banking & Fintech",
      body: "On-premise identity stack matching financial sector regulation and data residency.",
    },
    {
      icon: "🛡️",
      title: "Defense & Intelligence",
      body: "Airgapped deployment with zero outbound calls in fully isolated environments.",
    },
    {
      icon: "🏥",
      title: "Healthcare",
      body: "Patient data protection with encrypted storage and full audit trail.",
    },
    {
      icon: "🏭",
      title: "Manufacturing & OT",
      body: "Identity for operational systems isolated from the corporate network.",
    },
    {
      icon: "🎓",
      title: "Education & Research",
      body: "SSO for thousands of student and faculty accounts with predictable, low TCO.",
    },
  ];
  return (
    <section className="section-pad" id="use-cases">
      <div className="container-x">
        <div className="section-head" data-reveal="">
          <span className="eyebrow">
            <span className="dot" />
            Use cases
          </span>
          <h2>Built for sectors that take identity seriously.</h2>
          <p>
            From government to OT — NQRust adapts to environments where control and compliance are
            non-negotiable.
          </p>
        </div>

        <div className="usecases-grid">
          {items.map((it) => (
            <div className="usecase" key={it.title}>
              <div className="usecase-icon" style={{ fontSize: 22 }}>
                {it.icon}
              </div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   11. Final CTA — dual card
   ─────────────────────────────────────────── */
export function FinalCta() {
  return (
    <section
      className="section-pad"
      id="get-started"
      style={{
        background: "var(--color-bg-alt)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="container-x">
        <div className="section-head" data-reveal="" style={{ textAlign: "center", margin: "0 auto 0" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            <span className="dot" />
            Get started
          </span>
          <h2>Start today.</h2>
          <p>
            Free 1-year trial license. No credit card required. License key activated during
            install.
          </p>
        </div>

        <div className="final-cta-grid reveal-group" data-reveal="">
          <div className="final-cta-card primary">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "var(--color-primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Terminal size={26} strokeWidth={1.8} />
            </div>
            <h3>Download NQRust Installer</h3>
            <p>
              Linux x86_64 / arm64. Online & airgapped modes. Full stack (Identity, Portal, DB,
              Traefik) deployed in under 15 minutes.
            </p>
            <div className="dl-badges">
              <span className="badge badge-orange">Free 1-Year Trial</span>
              <span className="badge badge-gray">~120 MB online · ~3.5 GB airgapped</span>
            </div>
            <div className="actions">
              <a
                className="btn btn-primary btn-lg"
                href={DOWNLOADS.installer.url}
                target="_blank"
                rel="noreferrer"
              >
                <Download size={16} strokeWidth={2} />
                Download Now
              </a>
              <a className="btn btn-secondary" href="#faq">
                Read the FAQ
              </a>
            </div>
          </div>

          <div className="final-cta-card secondary">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "var(--color-surface-2)",
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconWhatsApp size={26} stroke={1.8} />
            </div>
            <h3>Contact Sales</h3>
            <p>
              For live demos, POC engagements, custom licensing, or government/SOE procurement
              discussions — reach our local team directly.
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono), JetBrains Mono, monospace",
                fontSize: 13,
                color: "var(--color-text-muted)",
              }}
            >
              +62 851-5512-1460
            </div>
            <div className="actions">
              <a
                className="btn btn-secondary btn-lg"
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
              >
                <IconWhatsApp size={16} stroke={2} />
                WhatsApp Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
