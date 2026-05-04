import Image from "next/image";
import { LINKS, SALES_EMAIL_URL } from "@/lib/constants";
import { Download, ExternalLink } from "lucide-react";

export function Nav() {
  return (
    <nav className="nav">
      <div className="container-x nav-inner">
        <a href="#top" className="nav-brand">
          <Image src="/assets/nqr-logo.png" alt="NQRust" width={56} height={28} priority />
          <span className="nav-brand-text font-semibold">NQRust Identity</span>
        </a>
        {/* Mobile-only centered brand label */}
        <span className="nav-brand-mobile font-semibold" aria-hidden="true">
          NQRust Identity
        </span>
        <div className="nav-links">
          <a href="#solution">Product</a>
          <a href="#architecture">Architecture</a>
          <a href="#security">Security</a>
          <a href="#comparison">Compare</a>
          <a href="#faq">FAQ</a>
          <a href={LINKS.docs} target="_blank" rel="noreferrer">
            Docs <ExternalLink size={12} />
          </a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost btn-sm nav-cta-secondary" href={SALES_EMAIL_URL}>
            Contact Sales
          </a>
          <a
            className="btn btn-primary btn-sm nav-cta-download"
            href="#get-started"
            aria-label="Download installer"
          >
            <Download size={16} />
            <span className="nav-cta-label">Download</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
