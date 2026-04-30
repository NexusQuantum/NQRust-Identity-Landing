"use client";

import { useState } from "react";
import Image from "next/image";
import { DOWNLOADS, LINKS, WA_URL } from "@/lib/constants";
import { ArchDiagram } from "./arch-diagram";
import { HeroVideoPlayer } from "./hero-video-player";
import {
  IconArrowRight,
  IconBook,
  IconCheck,
  IconDownload,
  IconGitHub,
  IconKey,
  IconPlay,
  IconPlus,
  IconShield,
  IconSmartphone,
  IconTerminal,
  IconWhatsApp,
} from "./icons";

export function Hero() {
  const scrollToDemo = () => {
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="container-x hero-inner">
        <div>
          <span className="eyebrow">
            <span className="dot" />
            NQRust Identity · v1.0
          </span>
          <h1>
            Identity & Access Management.
            <br />
            <span className="accent">Self-Hosted. Airgapped Ready.</span>
          </h1>
          <p className="hero-sub">
            A complete SSO stack with an offline-first mobile authenticator and a one-command installer.
            Built for teams that need full control over identity, sessions, and audit trail.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#get-started">
              <IconDownload size={16} stroke={2} />
              Download Installer
              <span style={{ opacity: 0.7, fontWeight: 500, marginLeft: 4 }}>· Free 1Y Trial</span>
            </a>
            <button className="btn btn-secondary btn-lg" onClick={scrollToDemo}>
              <IconPlay size={14} stroke={2} />
              Watch Demo
            </button>
          </div>
          <div className="hero-trust">
            <span>
              <IconCheck size={14} stroke={2.4} className="check" style={{ verticalAlign: "-2px" }} /> Self-hosted
            </span>
            <span className="dot">·</span>
            <span>
              <IconCheck size={14} stroke={2.4} className="check" style={{ verticalAlign: "-2px" }} /> Airgapped
            </span>
            <span className="dot">·</span>
            <span>
              <IconCheck size={14} stroke={2.4} className="check" style={{ verticalAlign: "-2px" }} /> OIDC / OAuth2 / SAML
            </span>
            <span className="dot">·</span>
            <span>
              <IconCheck size={14} stroke={2.4} className="check" style={{ verticalAlign: "-2px" }} /> Audit trail
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hv-chrome">
            <div className="dotc" />
            <div className="dotc" />
            <div className="dotc" />
            <span className="label">nqrust-identity · v1.0</span>
          </div>
          <HeroVideoPlayer />
        </div>
      </div>
    </section>
  );
}

export function VideoSection() {
  return (
    <section className="section-pad" id="demo">
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot" />
            02 · Demo
          </span>
          <h2>A 90-second product tour.</h2>
          <p>
            See the installer deploy the full stack, then watch a user sign in via SSO and enroll 2FA from the mobile
            app — all in a single walkthrough.
          </p>
        </div>
        <div
          className="video-wrap"
          onClick={() =>
            alert(
              "The demo video will be published alongside v1.0 GA — an unlisted YouTube embed will go here.",
            )
          }
        >
          <div className="video-poster">
            <div className="video-title">NQRust Identity · Product Tour</div>
            <div className="video-play">
              <IconPlay size={32} stroke={0} />
            </div>
            <div className="video-meta">90s · YouTube · unlisted</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    {
      icon: <IconKey size={22} />,
      title: "Enterprise Single Sign-On",
      body:
        "OIDC, OAuth2, and SAML 2.0 in one broker. Federation with LDAP/Active Directory, per-realm role mapping, and configurable client policies.",
      tags: ["OIDC", "OAuth2", "SAML 2.0", "LDAP/AD"],
    },
    {
      icon: <IconSmartphone size={22} />,
      title: "Offline Mobile 2FA",
      body:
        "An authenticator app that generates TOTP/HOTP codes with no internet required. RFC 6238 / RFC 4226 compliant, with encrypted local backup.",
      tags: ["TOTP", "HOTP", "Offline-first", "Encrypted backup"],
    },
    {
      icon: <IconTerminal size={22} />,
      title: "One-Command Installer",
      body:
        "A Rust-based TUI installer that deploys the full stack via Docker Compose. Supports airgapped mode with an offline image bundle.",
      tags: ["Rust TUI", "Docker Compose", "Airgapped"],
    },
    {
      icon: <IconShield size={22} />,
      title: "Self-Hosted & Auditable",
      body:
        "Data never leaves your infrastructure. Full audit trail for logins, role changes, sessions, and admin actions — ready for compliance review.",
      tags: ["On-premise", "Audit trail", "ISO 27001-ready"],
    },
  ];
  return (
    <section
      className="section-pad"
      id="features"
      style={{ background: "var(--color-bg-alt)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot" />
            03 · Capabilities
          </span>
          <h2>Four pillars built for full control.</h2>
          <p>No vendor lock-in, no data shipped to third parties. Every component runs on your own machines.</p>
        </div>
        <div className="features-grid">
          {items.map((it) => (
            <div className="feature" key={it.title}>
              <div className="feature-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
              <div className="feature-tags">
                {it.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Architecture() {
  return (
    <section className="section-pad arch" id="architecture">
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot" />
            04 · Architecture
          </span>
          <h2>Four services, one deployment.</h2>
          <p>
            The installer provisions Traefik, Identity Server, Portal (Next.js), and PostgreSQL on the same host — or
            split across hosts, to fit your scale. All sensitive traffic stays inside your airgapped zone.
          </p>
        </div>
        <div className="arch-canvas">
          <ArchDiagram />
          <div className="arch-legend">
            <div className="li">
              <span className="sw" style={{ background: "#FF6B1A" }} />
              HTTPS · OIDC flow
            </div>
            <div className="li">
              <span className="sw" style={{ background: "#2563EB" }} />
              TOTP / HOTP handshake
            </div>
            <div className="li">
              <span
                className="sw"
                style={{
                  background: "#9A9AA8",
                  backgroundImage: "repeating-linear-gradient(90deg, #9A9AA8 0 4px, transparent 4px 8px)",
                }}
              />
              Provisioning · enroll
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Downloads() {
  return (
    <section className="section-pad" id="download">
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">
            <span className="dot" />
            05 · Get started
          </span>
          <h2>Two downloads. The full stack.</h2>
          <p>Start with the installer to deploy the server, then hand the mobile authenticator to your users. Both are free to try.</p>
        </div>
        <div className="dl-grid">
          <div className="dl-card featured">
            <div className="dl-icon">
              <IconTerminal size={28} stroke={1.8} />
            </div>
            <div className="dl-title">NQRust Installer</div>
            <div className="dl-badges">
              <span className="badge badge-orange">Free 1-Year Trial License</span>
              <span className="badge badge-gray">Linux x86_64 / arm64</span>
            </div>
            <p className="dl-desc">
              Deploy the entire NQRust Identity stack on your Linux server. Includes Identity Server, admin Portal,
              PostgreSQL, and Traefik reverse proxy — ready to use in 5 minutes.
            </p>
            <div className="dl-meta">
              <span style={{ color: "var(--color-text)" }}>$ </span>
              curl -fsSL get.nqrust.id/install | sh
              <br />
              <span style={{ color: "var(--color-text-faint)" }}># license key entered during install</span>
            </div>
            <div className="dl-actions">
              <a className="btn btn-primary" href={DOWNLOADS.installer.url} target="_blank" rel="noreferrer">
                <IconDownload size={15} stroke={2} />
                Download Installer
              </a>
              <a className="btn btn-secondary" href={WA_URL} target="_blank" rel="noreferrer">
                <IconWhatsApp size={15} stroke={2} />
                Contact Sales
              </a>
            </div>
          </div>

          <div className="dl-card">
            <div className="dl-icon">
              <IconSmartphone size={28} stroke={1.8} />
            </div>
            <div className="dl-title">NQRust Auth</div>
            <div className="dl-badges">
              <span className="badge badge-green">Free · Open Source</span>
              <span className="badge badge-gray">Android · APK</span>
            </div>
            <p className="dl-desc">
              An offline 2FA app for Android. Generates TOTP/HOTP codes with no internet required, with encrypted
              local backup and biometric unlock.
            </p>
            <div className="dl-platforms">
              <span>
                <IconCheck size={13} stroke={2.4} style={{ color: "#16A34A" }} /> Android 8.0+
              </span>
              <span>
                <IconCheck size={13} stroke={2.4} style={{ color: "#16A34A" }} /> Offline TOTP/HOTP
              </span>
              <span>
                <IconCheck size={13} stroke={2.4} style={{ color: "#16A34A" }} /> Encrypted backup
              </span>
            </div>
            <div className="dl-actions">
              <a className="btn btn-primary" href={DOWNLOADS.apk.url} target="_blank" rel="noreferrer">
                <IconDownload size={15} stroke={2} />
                Download APK
              </a>
              <button className="btn btn-disabled" disabled>
                iOS — Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DocsBanner() {
  return (
    <section className="section-pad-sm">
      <div className="container-x">
        <div className="docs-banner">
          <div>
            <span className="eyebrow" style={{ color: "#FF6B1A" }}>
              <span className="dot" />
              Documentation
            </span>
            <h2 style={{ marginTop: 12 }}>Need install & configuration guides?</h2>
            <p>
              From quick-start and realm configuration to OIDC client integration and airgapped deployment scenarios —
              all covered in the docs.
            </p>
          </div>
          <a className="btn btn-primary btn-lg" href={LINKS.docs} target="_blank" rel="noreferrer">
            <IconBook size={16} stroke={2} />
            Open Documentation
            <IconArrowRight size={14} stroke={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: "What's included in the free 1-year trial?",
      a:
        "All production features: unlimited users, SSO/OIDC/SAML, mobile 2FA, audit trail, and airgapped installer. The license key is generated the first time you run the installer. For renewals or a production license, contact sales.",
    },
    {
      q: "What are the Identity Server system requirements?",
      a:
        "Minimum: 2 vCPU, 4 GB RAM, 20 GB disk for small deployments (< 500 users). Recommended: 4 vCPU, 8 GB RAM, 50 GB SSD. Linux x86_64 or arm64, Docker 24+. PostgreSQL can be hosted separately or co-deployed by the installer.",
    },
    {
      q: "How do I install in an airgapped environment?",
      a:
        "The installer supports offline mode — download the bundle (~2.3 GB containing all container images) from a machine with internet access, transfer it to the target via storage media, then run the installer with the `--offline` flag. No outbound connections are required after installation.",
    },
    {
      q: "Is user data stored on NQRust's servers?",
      a:
        "No. All data (users, sessions, audit log, 2FA secrets) lives in your own PostgreSQL. NQRust has no access to your installation. The NQRust Auth mobile app is also fully offline — TOTP secrets are stored on-device with encryption.",
    },
    {
      q: "How does license renewal work?",
      a:
        "30 days before the trial ends, the admin portal shows a reminder. Reach out to sales via WhatsApp to request a quotation. After payment, you'll receive a new license key — just paste it into the portal, no redeployment required.",
    },
    {
      q: "Is support / SLA available?",
      a:
        "Trial tier: best-effort via GitHub Issues and email. Production tier: Standard (1-business-day response) and Premium (4 hours, with a dedicated channel). Full SLA details available on a sales call.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section
      className="section-pad"
      id="faq"
      style={{ background: "var(--color-bg-alt)", borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-x" style={{ maxWidth: 880 }}>
        <div className="section-head" style={{ marginBottom: 40 }}>
          <span className="eyebrow">
            <span className="dot" />
            06 · FAQ
          </span>
          <h2>Frequently asked questions.</h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={it.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <span className="ico">
                  <IconPlus size={18} stroke={2} />
                </span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Image src="/assets/nqr-logo.png" alt="NQRust" width={64} height={32} />
              <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>NQRust Identity</span>
            </div>
            <p>
              Self-hosted Identity & Access Management for teams that need full control over data, sessions, and audit
              trail.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#solution">Product</a>
            <a href="#architecture">Architecture</a>
            <a href="#get-started">Download</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href={LINKS.docs} target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={DOWNLOADS.apk.url} target="_blank" rel="noreferrer">
              NQRust Auth APK
            </a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href={WA_URL} target="_blank" rel="noreferrer">
              Contact Sales
            </a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NexusQuantum · NQRust Identity v1.0</span>
          <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <a href={LINKS.github} target="_blank" rel="noreferrer" style={{ display: "inline-flex" }}>
              <IconGitHub size={18} stroke={1.6} />
            </a>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex" }}>
              <IconWhatsApp size={18} stroke={1.6} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
