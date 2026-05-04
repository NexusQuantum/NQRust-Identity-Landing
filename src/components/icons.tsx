import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "stroke"> & {
  size?: number;
  stroke?: number;
};

const Icon = ({ children, size = 20, stroke = 1.6, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const IconGitHub = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Icon>
);

export const IconWhatsApp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-1.3 4.5 8.5 8.5 0 0 1-7.4 4.3 8.4 8.4 0 0 1-4-1L3 21l1.7-5.2a8.5 8.5 0 1 1 16.3-4.3Z" />
    <path d="M8.5 9.5c.3 1.5 1 2.7 2 3.7s2.2 1.7 3.7 2c.4 0 .8-.1 1.1-.4l.6-.7c.3-.3.7-.4 1-.2l1.4.6c.4.2.6.6.4 1a3 3 0 0 1-2.5 1.7c-1.4 0-3.5-.7-5.4-2.6S8.2 11 8.2 9.6A3 3 0 0 1 9.9 7c.4-.2.8 0 1 .4l.6 1.4c.2.3 0 .7-.2 1l-.7.6c-.3.3-.4.7-.4 1.1Z" />
  </Icon>
);

export const IconMail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);

export const IconAndroid = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 18V11a7 7 0 0 1 14 0v7" />
    <path d="M2 18h20" />
    <path d="M8 7l-1.5-2.5M16 7l1.5-2.5" />
    <circle cx="9" cy="14" r="0.6" fill="currentColor" />
    <circle cx="15" cy="14" r="0.6" fill="currentColor" />
  </Icon>
);
