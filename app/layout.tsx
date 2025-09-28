import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natnael Sisay - Full-Stack Developer",
  description:
    "Passionate full-stack developer creating exceptional digital experiences through clean code and innovative solutions.",
  keywords:
    "web developer, full-stack developer, React, Next.js, TypeScript, ReactNative",
  authors: [{ name: "Natnael" }],
  openGraph: {
    title: "Natnael - Full-Stack Developer",
    description:
      "Passionate full-stack developer creating exceptional digital experiences through clean code and innovative solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natnael - Full-Stack Developer",
    description:
      "Passionate full-stack developer creating exceptional digital experiences through clean code and innovative solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
