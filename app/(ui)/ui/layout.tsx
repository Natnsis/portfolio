import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

// Outfit for the whole UI; JetBrains Mono only for code-like chips and labels.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-dk-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-dk-mono" });

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
    <html lang="en" className={`${outfit.variable} ${mono.variable}`}>
      {/* Extensions like ColorZilla add attributes to <body> before React loads. */}
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
