import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

// Same code font as the UI section's chips, so both looks feel like one site.
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-term" });
// The regular site's font, for the first-visit dialog that speaks to everyone.
const sans = Outfit({ subsets: ["latin"], variable: "--font-gate" });

export const metadata: Metadata = {
  title: "Natnael Sisay — Full-Stack Developer",
  description:
    "Full-stack developer who researches before building and ships quality software, solo or with a team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      {/* Extensions like ColorZilla add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
