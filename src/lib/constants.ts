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
  docs: "https://nq-rust-identity-docs.vercel.app/",
  github: "https://github.com/NexusQuantum",
  salesWa: "6285155121460",
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

export const WA_URL =
  "https://wa.me/6285155121460?text=" +
  encodeURIComponent(
    "Hi NQRust, I'm interested in NQRust Identity and would like to ask about licensing.\n\nName: \nCompany: \nEstimated users: \nInterest: [ ] Trial extension  [ ] Production license  [ ] Airgapped consultation  [ ] Other\n\nPlease share package and pricing info. Thank you.",
  );
