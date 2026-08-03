import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.9h2.65l.4-3.08h-3.05V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.8c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.95 1.43-3.95 4.06v2.27H7.68v3.08h2.65V21h3.17Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3.5 9.75h3v10.75h-3V9.75Zm6.25 0h2.88v1.47h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v6.22h-3v-5.52c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.62h-3V9.75Z" />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21.7l-6.1 7 7.2 9.5h-5.63l-4.41-5.77L7.3 19.5H4.5l6.53-7.48L4.1 3h5.77l3.98 5.27L18.9 3Zm-.98 15.02h1.53L7.16 4.9H5.52l12.4 13.12Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.5-.87-2.16c-.83-.87-1.76-.87-2.19-.93C15.44 4 12 4 12 4h-.01s-3.44 0-6.53.11c-.43.06-1.36.06-2.19.93-.66.66-.87 2.16-.87 2.16S2.19 8.94 2.19 10.68v1.63c0 1.74.21 3.48.21 3.48s.21 1.5.87 2.16c.83.87 1.92.84 2.4.93 1.75.17 7.33.22 7.33.22s3.45-.01 6.54-.11c.43-.06 1.36-.06 2.19-.93.66-.66.87-2.16.87-2.16s.21-1.74.21-3.48v-1.63c0-1.74-.21-3.48-.21-3.48ZM9.94 14.98V8.87l5.6 3.06-5.6 3.05Z" />
    </svg>
  );
}
