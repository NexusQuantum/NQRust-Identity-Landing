import { ArchDiagram } from "./arch-diagram";

export function HeroArchVisual({ animate = true }: { animate?: boolean }) {
  return (
    <div className="hv-body" style={{ padding: 18, background: "linear-gradient(180deg, #FFFFFF, #FAFAFB)" }}>
      <ArchDiagram animate={animate} />
    </div>
  );
}
