import type { ReactNode } from "react";
import { DesignSystem } from "@/types/enum/DesignSystem.enum";

export type DesignSystemOption = {
  id: DesignSystem;
  title: string;
  description: string;
  radius: string;
  preview: ReactNode;
};

function PreviewMockup({ radius, radiusLabel }: { radius: string; radiusLabel: string }) {
  const r = parseInt(radius) || 0;
  const rSm = r > 0 ? Math.min(r / 2, 6) : 0;

  return (
    <svg viewBox="0 0 320 260" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Card container */}
      <rect
        x={16} y={16} width={288} height={228} rx={r}
        fill="currentColor" fillOpacity={0.04}
        stroke="currentColor" strokeOpacity={0.15}
      />

      {/* Title bar */}
      <rect
        x={32} y={32} width={90} height={12} rx={rSm}
        fill="currentColor" fillOpacity={0.3}
      />

      {/* Content card */}
      <rect
        x={32} y={56} width={256} height={52} rx={r}
        fill="currentColor" fillOpacity={0.06}
        stroke="currentColor" strokeOpacity={0.1}
      />
      <rect
        x={44} y={68} width={70} height={10} rx={rSm}
        fill="currentColor" fillOpacity={0.25}
      />
      <rect
        x={44} y={86} width={140} height={6} rx={rSm}
        fill="currentColor" fillOpacity={0.12}
      />

      {/* Input field */}
      <rect
        x={32} y={120} width={256} height={28} rx={r}
        fill="currentColor" fillOpacity={0.03}
        stroke="currentColor" strokeOpacity={0.2}
        strokeDasharray="4 2"
      />
      <text
        x={44} y={139} fill="currentColor" fontSize={9} fontFamily="var(--font-sans)" opacity={0.3}
      >
        Input field
      </text>

      {/* Button */}
      <rect
        x={32} y={160} width={72} height={28} rx={r}
        fill="currentColor" fillOpacity={0.25}
        stroke="currentColor" strokeOpacity={0.35}
      />
      <text
        x={68} y={178} textAnchor="middle" fill="currentColor" fontSize={9} fontFamily="var(--font-sans)" fontWeight={500} opacity={0.7}
      >
        Button
      </text>

      {/* Secondary button */}
      <rect
        x={112} y={160} width={72} height={28} rx={r}
        fill="currentColor" fillOpacity={0.04}
        stroke="currentColor" strokeOpacity={0.15}
      />
      <text
        x={148} y={178} textAnchor="middle" fill="currentColor" fontSize={9} fontFamily="var(--font-sans)" fontWeight={400} opacity={0.4}
      >
        Cancel
      </text>

      {/* Radius badge */}
      <rect
        x={220} y={200} width={72} height={20} rx={4}
        fill="currentColor" fillOpacity={0.08}
        stroke="currentColor" strokeOpacity={0.12}
      />
      <text
        x={256} y={214} textAnchor="middle" fill="currentColor" fontSize={8} fontFamily="var(--font-sans)" fontWeight={500} opacity={0.4}
      >
        {radiusLabel}
      </text>
    </svg>
  );
}

export const roundedNone: DesignSystemOption = {
  id: DesignSystem.ROUNDED_NONE,
  title: "Sharp",
  description:
    "Zero border radius for a clean, angular aesthetic. Inspired by brutalist design principles, sharp corners convey precision and modernity. Ideal for data-heavy applications, dashboards, and enterprise software where clarity trumps decoration.",
  radius: "0px",
  preview: <PreviewMockup radius="0" radiusLabel="0px" />,
};

export const roundedLight: DesignSystemOption = {
  id: DesignSystem.ROUNDED_LIGHT,
  title: "Light",
  description:
    "Subtle 4px rounding that softens edges without losing professionalism. The most common choice in enterprise applications — it provides just enough warmth to feel approachable while maintaining a serious, trustworthy appearance. Used by Linear, Vercel, and Stripe.",
  radius: "4px",
  preview: <PreviewMockup radius="4" radiusLabel="4px" />,
};

export const roundedMedium: DesignSystemOption = {
  id: DesignSystem.ROUNDED_MEDIUM,
  title: "Medium",
  description:
    "Balanced 8px rounding for a modern, friendly feel. This is the sweet spot for most contemporary web applications — approachable without being playful, polished without being sterile. The default choice for SaaS products, marketplaces, and consumer-facing apps.",
  radius: "8px",
  preview: <PreviewMockup radius="8" radiusLabel="8px" />,
};

export const roundedHigh: DesignSystemOption = {
  id: DesignSystem.ROUNDED_HIGH,
  title: "High",
  description:
    "Generous 16px rounding for a playful, friendly aesthetic. Perfect for consumer apps, social platforms, and brands that want to feel warm and approachable. The pill-like shapes create a sense of fun and accessibility, commonly used in lifestyle and wellness products.",
  radius: "16px",
  preview: <PreviewMockup radius="16" radiusLabel="16px" />,
};