import type { Metadata } from "next";
import { DM_Mono, Handjet, Inter, Just_Me_Again_Down_Here } from "next/font/google";
import Splash from "@/components/artsy/Splash";
import "./globals.css";

const display = Handjet({
  subsets: ["latin"],
  axes: ["ELGR", "ELSH"],
  variable: "--font-artsy-display",
});
const hand = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-artsy-hand",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-artsy-mono",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-artsy-sans" });

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
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${mono.variable} ${sans.variable}`}
    >
      <body className="min-h-screen bg-ca-surface text-ca-ink antialiased">
        <div
          aria-hidden
          className="ca-grain pointer-events-none fixed inset-0 z-[1] mix-blend-multiply"
        />
        <Splash />
        {children}
      </body>
    </html>
  );
}
