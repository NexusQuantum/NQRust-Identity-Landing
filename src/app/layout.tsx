import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/constants";
import { AnimationObserver } from "@/components/animation-observer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Self-Hosted IAM, Airgapped Ready`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "identity management",
    "SSO",
    "OIDC",
    "OAuth2",
    "SAML",
    "self-hosted",
    "airgapped",
    "2FA",
    "TOTP",
    "authenticator",
    "NQRust",
  ],
  authors: [{ name: "NexusQuantum" }],
  icons: {
    icon: "/assets/nqr-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Self-Hosted IAM, Airgapped Ready`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Self-Hosted IAM, Airgapped Ready`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
        <AnimationObserver />
      </body>
    </html>
  );
}
