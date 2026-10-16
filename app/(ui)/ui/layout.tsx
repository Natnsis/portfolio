import type { Metadata } from "next";
import { Figtree, Fraunces, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-dk-sans" });
// Headings and spines: soft old-style serif; optical sizing tightens it at large sizes.
const serif = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-dk-serif",
});
// Long-form reading inside the open book.
const read = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-dk-read",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dk-mono" });

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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${read.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
