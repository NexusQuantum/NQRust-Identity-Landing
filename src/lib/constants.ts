export const SITE = {
  name: "NQRust Identity",
  shortName: "NQRust",
  tagline: "Self-Hosted IAM, Airgapped Ready",
  description:
    "A complete SSO stack with an offline-first mobile authenticator and a one-command installer. Self-hosted and airgapped-ready.",
  url: "https://nqrust.id",
};

export const DOWNLOADS = {
  installer: {
    url: "https://drive.google.com/drive/folders/1RCXg4pruL4g-wtsKn2Aw_2dr011sVqXt?usp=sharing",
    version: "v1.0.0",
  },
  apk: {
    url: "https://github.com/NexusQuantum/NQRust-Auth/releases/download/v1.0.0/NQRust-Auth-V1.0.0.apk",
    version: "v1.0.0",
  },
};

export const LINKS = {
  docs: "https://docs-identity.nexusquantum.id/",
  github: "https://github.com/NexusQuantum",
  salesEmail: "contact@nexusquantum.id",
};

/**
 * Per-video availability flags. Flip to `true` once the file lands in /public/videos/.
 * When false, ShortVideo renders the placeholder UI without firing 404 requests.
 */
export const VIDEOS_AVAILABLE: Record<string, boolean> = {
  "v0-hero-loop": false,
  "v1-stack-overview": true,
  "v2-mobile-auth": true,
  "v3-portal-tour": true,
  "v4-airgapped-install": true,
  "v5-arch-animated": false,
};

/**
 * Pre-filled mailto link for sales inquiries. Subject + body templated;
 * customer's email client opens with the draft ready to send.
 */
export const SALES_EMAIL_URL =
  `mailto:${LINKS.salesEmail}?subject=` +
  encodeURIComponent("NQRust Identity — Sales Inquiry") +
  "&body=" +
  encodeURIComponent(
    "Hi NQRust team,\n\nI'm interested in NQRust Identity and would like to discuss licensing.\n\nName: \nCompany: \nEstimated users: \nInterest: [ ] Trial extension  [ ] Production license  [ ] Airgapped consultation  [ ] Other\n\nPlease share package and pricing info.\n\nThank you.",
  );

/** Backward compatibility alias — components still importing WA_URL will get the email link instead. */
export const WA_URL = SALES_EMAIL_URL;
