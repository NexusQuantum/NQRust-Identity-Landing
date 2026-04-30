import Image from "next/image";
import { LINKS, WA_URL } from "@/lib/constants";
import { IconArrowRight, IconExternal } from "./icons";

export function Nav() {
  return (
    <nav className="nav">
      <div className="container-x nav-inner">
        <a href="#top" className="nav-brand">
          <Image src="/assets/nqr-logo.png" alt="NQRust" width={56} height={28} priority />
          <span className="nav-brand-name">
            <b>NQRust</b> <span>Identity</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#solution">Product</a>
          <a href="#architecture">Architecture</a>
          <a href="#security">Security</a>
          <a href="#comparison">Compare</a>
          <a href="#faq">FAQ</a>
          <a href={LINKS.docs} target="_blank" rel="noreferrer">
            Docs <IconExternal size={12} stroke={2} />
          </a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost btn-sm" href={WA_URL} target="_blank" rel="noreferrer">
            Contact Sales
          </a>
          <a className="btn btn-primary btn-sm" href="#get-started">
            Download
            <IconArrowRight size={14} stroke={2.2} />
          </a>
        </div>
      </div>
    </nav>
  );
}
