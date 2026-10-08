import type { Metadata } from "next";
import { Caveat, Space_Mono } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });
const hand = Caveat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-caveat" });

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
    <html lang="en" className={`${mono.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
