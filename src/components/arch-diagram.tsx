type NodeKind = "edge" | "app" | "core" | "tool" | "client";
type NodeIconName = "user" | "mobile" | "shield" | "server" | "terminal" | "layers";

interface NodeDef {
  x: number;
  y: number;
  label: string;
  sub: string;
  kind: NodeKind;
}

const NODES: Record<string, NodeDef> = {
  user:      { x: 100, y: 240, label: "User",            sub: "Browser / Device",      kind: "edge" },
  mobile:    { x: 100, y: 420, label: "NQRust Auth",      sub: "MFA · TOTP / HOTP",     kind: "edge" },
  app1:      { x: 340, y: 110, label: "Your App",         sub: "Web · API · Service",   kind: "client" },
  app2:      { x: 340, y: 250, label: "Your App",         sub: "Web · API · Service",   kind: "client" },
  app3:      { x: 340, y: 390, label: "Your App",         sub: "Web · API · Service",   kind: "client" },
  portal:    { x: 560, y: 390, label: "Identity Portal",  sub: "Next.js · OIDC client", kind: "app" },
  server:    { x: 790, y: 230, label: "Identity Server",  sub: "OIDC · OAuth2 · SAML",  kind: "core" },
  installer: { x: 930, y: 80,  label: "NQRust Installer", sub: "TUI · Docker Compose",  kind: "tool" },
};

interface EdgeProps {
  from: NodeDef;
  to: NodeDef;
  color?: string;
  className?: string;
  markerEnd?: string;
  label?: string;
  labelOffset?: number;
  curve?: number;
  dashed?: boolean;
}

function Edge({
  from,
  to,
  color = "#FF6B1A",
  className = "",
  markerEnd,
  label,
  labelOffset = -10,
  curve = 0,
  dashed = false,
}: EdgeProps) {
  const fx = from.x + 85;
  const fy = from.y;
  const tx = to.x - 85;
  const ty = to.y;
  const mx = (fx + tx) / 2;
  const c1x = mx;
  const c1y = fy + curve;
  const c2x = mx;
  const c2y = ty + curve;
  const d = `M ${fx} ${fy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tx} ${ty}`;
  return (
    <g>
      <path
        d={d}
        stroke={color}
        strokeWidth="1.6"
        fill="none"
        className={className}
        strokeDasharray={dashed && !className ? "3 5" : undefined}
        strokeOpacity={dashed ? 0.55 : 0.85}
        markerEnd={markerEnd}
      />
      {label && (
        <text
          x={(fx + tx) / 2}
          y={(fy + ty) / 2 + labelOffset}
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="#6B6B76"
          textAnchor="middle"
          style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: 3 }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function NodeIcon({ name, highlight }: { name: NodeIconName; highlight?: boolean }) {
  const c = highlight ? "#FF6B1A" : "#0B0B0F";
  const bg = highlight ? "#FFE5D6" : "#F5F5F7";
  const wrap = (children: React.ReactNode) => (
    <g>
      <rect width="32" height="32" rx="8" fill={bg} />
      <g
        transform="translate(6 6)"
        stroke={c}
        fill="none"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </g>
  );
  switch (name) {
    case "user":
      return wrap(
        <>
          <circle cx="10" cy="7" r="3.2" />
          <path d="M3 19a7 7 0 0 1 14 0" />
        </>,
      );
    case "mobile":
      return wrap(
        <>
          <rect x="5" y="2" width="10" height="16" rx="1.5" />
          <path d="M10 15h.01" />
        </>,
      );
    case "shield":
      return wrap(
        <>
          <path d="M10 2 4 4v6c0 4 2.5 6.5 6 7 3.5-.5 6-3 6-7V4l-6-2Z" />
          <path d="m7 10 2 2 4-4" />
        </>,
      );
    case "server":
      return wrap(
        <>
          <rect x="2" y="3" width="16" height="6" rx="1.2" />
          <rect x="2" y="11" width="16" height="6" rx="1.2" />
          <path d="M5 6h.01M5 14h.01" />
        </>,
      );
    case "terminal":
      return wrap(
        <>
          <path d="m4 6 3 3-3 3" />
          <path d="M9 12h6" />
          <rect x="2" y="3" width="16" height="14" rx="1.5" />
        </>,
      );
    case "layers":
      return wrap(
        <>
          <path d="M2 9l8-5 8 5-8 5-8-5Z" />
          <path d="M2 14l8 5 8-5" />
        </>,
      );
  }
}

function Node({
  x,
  y,
  label,
  sub,
  icon,
  highlight = false,
  muted = false,
}: NodeDef & { icon: NodeIconName; highlight?: boolean; muted?: boolean }) {
  const W = 185;
  const H = 60;
  const fill = muted ? "#FAFAFA" : "#FFFFFF";
  const stroke = highlight ? "#FF6B1A" : muted ? "#D4D4D8" : "#D4D4D8";
  const strokeW = highlight ? 1.8 : 1;
  const labelColor = muted ? "#6B6B76" : "#0B0B0F";
  const subColor = muted ? "#9A9AA8" : "#6B6B76";
  return (
    <g transform={`translate(${x - W / 2}, ${y - H / 2})`}>
      {highlight && (
        <rect
          x="-4"
          y="-4"
          width={W + 8}
          height={H + 8}
          rx="12"
          fill="none"
          stroke="#FF6B1A"
          strokeOpacity="0.18"
          strokeWidth="6"
        />
      )}
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        rx="9"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW}
        strokeDasharray={muted ? "4 3" : undefined}
        filter="drop-shadow(0 1px 2px rgba(11,11,15,0.06))"
      />
      <g transform="translate(12, 14)">
        <NodeIcon name={icon} highlight={highlight} />
      </g>
      <text x="50" y="26" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="600" fill={labelColor}>
        {label}
      </text>
      <text x="50" y="42" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={subColor}>
        {sub}
      </text>
    </g>
  );
}

export function ArchDiagram({ animate = true }: { animate?: boolean }) {
  const N = NODES;
  const flow = animate ? "flow-line" : "";
  const flowFast = animate ? "flow-line-fast" : "";

  return (
    <svg
      viewBox="-20 -10 1120 520"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#FF6B1A" />
        </marker>
        <marker id="arrGray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#9A9AA8" />
        </marker>
        <marker id="arrBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#2563EB" />
        </marker>
        <linearGradient id="airgapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B1A" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6B1A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Your Apps zone */}
      <rect
        x="233"
        y="55"
        width="214"
        height="390"
        rx="10"
        fill="none"
        stroke="#2563EB"
        strokeOpacity="0.25"
        strokeDasharray="3 5"
        strokeWidth="1.2"
      />
      <text x="248" y="76" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#2563EB" fillOpacity="0.6" letterSpacing="0.04em">
        YOUR APPS
      </text>

      {/* Self-hosted zone */}
      <rect
        x="460"
        y="20"
        width="578"
        height="450"
        rx="14"
        fill="url(#airgapGrad)"
        stroke="#FF6B1A"
        strokeOpacity="0.35"
        strokeDasharray="2 6"
        strokeWidth="1.5"
      />
      <text x="478" y="44" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#C84A0A" letterSpacing="0.05em">
        SELF-HOSTED · AIRGAPPED ZONE
      </text>

      {/* User → Your Apps */}
      <Edge from={N.user} to={N.app1} color="#9A9AA8" markerEnd="url(#arrGray)" curve={-20} />
      <Edge from={N.user} to={N.app2} color="#9A9AA8" markerEnd="url(#arrGray)" />
      <Edge from={N.user} to={N.app3} color="#9A9AA8" markerEnd="url(#arrGray)" curve={20} />

      {/* Your Apps → Identity Server */}
      <Edge from={N.app1} to={N.server} className={flow} color="#FF6B1A" markerEnd="url(#arr)" label="OIDC" labelOffset={-12} curve={-20} />
      <Edge from={N.app2} to={N.server} className={flow} color="#FF6B1A" markerEnd="url(#arr)" label="OIDC" labelOffset={-12} />
      <Edge from={N.app3} to={N.portal} className={flow} color="#FF6B1A" markerEnd="url(#arr)" label="OIDC" labelOffset={-12} />

      {/* Identity Portal → Identity Server */}
      <Edge from={N.portal} to={N.server} className={flow} color="#FF6B1A" markerEnd="url(#arr)" curve={-40} />

      {/* NQRust Auth → Identity Server */}
      <Edge from={N.mobile} to={N.server} className={flowFast} color="#2563EB" markerEnd="url(#arrBlue)" label="TOTP / HOTP" labelOffset={14} curve={-50} />

      {/* User → Mobile (enroll) */}
      <Edge from={N.user} to={N.mobile} color="#9A9AA8" dashed label="enroll" />

      {/* Installer → stack (deploy) */}
      <Edge from={N.installer} to={N.server} color="#9A9AA8" dashed label="deploy" labelOffset={-12} />
      <Edge from={N.installer} to={N.portal} color="#9A9AA8" dashed />

      {/* Nodes */}
      <Node {...N.user}      icon="user"     />
      <Node {...N.mobile}    icon="mobile"   />
      <Node {...N.app1}      icon="layers"   muted />
      <Node {...N.app2}      icon="layers"   muted />
      <Node {...N.app3}      icon="layers"   muted />
      <Node {...N.portal}    icon="server"   />
      <Node {...N.server}    icon="shield"   highlight />
      <Node {...N.installer} icon="terminal" />

      {animate && (
        <circle cx={N.server.x + 85} cy={N.server.y} r="6" fill="#FF6B1A" opacity="0.6">
          <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
