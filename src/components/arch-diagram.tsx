type NodeKind = "edge" | "infra" | "app" | "core" | "tool";
type NodeIconName = "user" | "mobile" | "shield" | "server" | "db" | "terminal" | "route";

interface NodeDef {
  x: number;
  y: number;
  label: string;
  sub: string;
  kind: NodeKind;
}

const NODES: Record<string, NodeDef> = {
  user: { x: 90, y: 260, label: "User", sub: "Browser / Device", kind: "edge" },
  mobile: { x: 90, y: 420, label: "NQRust Auth", sub: "Mobile · TOTP/HOTP", kind: "edge" },
  traefik: { x: 320, y: 100, label: "Traefik", sub: "Reverse Proxy · TLS", kind: "infra" },
  portal: { x: 320, y: 260, label: "Identity Portal", sub: "Next.js · OIDC client", kind: "app" },
  server: { x: 580, y: 260, label: "Identity Server", sub: "OIDC · OAuth2 · SAML", kind: "core" },
  db: { x: 580, y: 440, label: "PostgreSQL", sub: "Users · Sessions · Audit", kind: "infra" },
  installer: { x: 730, y: 80, label: "NQRust Installer", sub: "TUI · Docker Compose", kind: "tool" },
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
    case "db":
      return wrap(
        <>
          <ellipse cx="10" cy="4.5" rx="7" ry="2.5" />
          <path d="M3 4.5v5c0 1.4 3 2.5 7 2.5s7-1.1 7-2.5v-5" />
          <path d="M3 9.5v5c0 1.4 3 2.5 7 2.5s7-1.1 7-2.5v-5" />
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
    case "route":
      return wrap(
        <>
          <circle cx="5" cy="15" r="1.8" />
          <circle cx="15" cy="5" r="1.8" />
          <path d="M6.5 14h6.5a3.5 3.5 0 0 0 0-7h-6.5a3.5 3.5 0 0 1 0-7" />
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
}: NodeDef & { icon: NodeIconName; highlight?: boolean }) {
  const W = 170;
  const H = 60;
  const fill = "#FFFFFF";
  const stroke = highlight ? "#FF6B1A" : "#D4D4D8";
  const strokeW = highlight ? 1.8 : 1;
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
        filter="drop-shadow(0 1px 2px rgba(11,11,15,0.06))"
      />
      <g transform="translate(12, 14)">
        <NodeIcon name={icon} highlight={highlight} />
      </g>
      <text x="50" y="26" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="600" fill="#0B0B0F">
        {label}
      </text>
      <text x="50" y="42" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6B6B76">
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
      viewBox="0 0 880 540"
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
        <linearGradient id="airgapGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B1A" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6B1A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF6B1A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="240"
        y="40"
        width="600"
        height="470"
        rx="14"
        fill="url(#airgapGrad)"
        stroke="#FF6B1A"
        strokeOpacity="0.35"
        strokeDasharray="2 6"
        strokeWidth="1.5"
      />
      <text x="260" y="64" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#C84A0A" letterSpacing="0.05em">
        SELF-HOSTED · AIRGAPPED ZONE
      </text>

      <Edge from={N.user} to={N.portal} className={flow} color="#FF6B1A" markerEnd="url(#arr)" label="HTTPS" labelOffset={-12} />
      <Edge from={N.portal} to={N.server} className={flow} color="#FF6B1A" markerEnd="url(#arr)" label="OIDC" labelOffset={-12} />
      <Edge from={N.mobile} to={N.server} className={flowFast} color="#2563EB" markerEnd="url(#arrGray)" label="TOTP / HOTP" labelOffset={14} curve={-40} />
      <Edge from={N.user} to={N.mobile} color="#9A9AA8" dashed label="enroll" />
      <Edge from={N.server} to={N.db} className={flow} color="#FF6B1A" markerEnd="url(#arr)" />
      <Edge from={N.traefik} to={N.portal} className={flow} color="#FF6B1A" markerEnd="url(#arr)" />
      <Edge from={N.traefik} to={N.server} className={flow} color="#FF6B1A" markerEnd="url(#arr)" curve={-30} />
      <Edge from={N.installer} to={N.traefik} color="#9A9AA8" dashed label="deploy" />
      <Edge from={N.installer} to={N.server} color="#9A9AA8" dashed />
      <Edge from={N.installer} to={N.db} color="#9A9AA8" dashed />

      <Node {...N.user} icon="user" />
      <Node {...N.mobile} icon="mobile" />
      <Node {...N.traefik} icon="route" />
      <Node {...N.portal} icon="server" />
      <Node {...N.server} icon="shield" highlight />
      <Node {...N.db} icon="db" />
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
