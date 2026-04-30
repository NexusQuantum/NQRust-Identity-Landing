import { Nav } from "@/components/nav";
import {
  Architecture,
  DocsBanner,
  FAQ,
  Footer,
  Hero,
} from "@/components/sections";
import {
  Comparison,
  FinalCta,
  Problem,
  SecurityOverview,
  Solution,
  TrustBar,
  UseCases,
  UspAirgapped,
  UspIndonesia,
  UspMobile,
  UspPortal,
} from "@/components/new-sections";
import { DOWNLOADS, LINKS, SITE } from "@/lib/constants";

export const dynamic = "force-static";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    description: SITE.description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free 1-Year Trial License",
    },
    softwareVersion: DOWNLOADS.installer.version,
    url: SITE.url,
    sameAs: [LINKS.github],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        {/* 1. Hero with V0 video loop */}
        <Hero />

        {/* 2. Trust Bar — BIN */}
        <TrustBar />

        {/* 3. Problem — 5 pain points */}
        <Problem />

        {/* 4. Solution 4-in-One (V1 video) */}
        <Solution />

        {/* 5. USP #1 — Mobile Auth (V2 vertical) */}
        <UspMobile />

        {/* 6. USP #2 — Portal Branded (V3) */}
        <UspPortal />

        {/* 7. USP #3 — Self-Hosted & Airgapped (V4) */}
        <UspAirgapped />

        {/* 8. USP #4 — Made in Indonesia · TKDN */}
        <UspIndonesia />

        {/* 9. Architecture (existing component) */}
        <Architecture />

        {/* 10. Security Overview (3 columns) */}
        <SecurityOverview />

        {/* 11. Comparison vs Cloud IAM */}
        <Comparison />

        {/* 12. Use Cases (6 industries) */}
        <UseCases />

        {/* 13. FAQ */}
        <FAQ />

        {/* 14. Final CTA — dual card */}
        <FinalCta />

        {/* 15. Docs Banner — secondary CTA */}
        <DocsBanner />
      </main>

      {/* Footer (existing) */}
      <Footer />
    </>
  );
}
