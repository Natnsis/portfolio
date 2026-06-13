import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Natnael Sisay — Full Stack Developer",
  description:
    "Portfolio of Natnael Sisay, a full-stack software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", manrope.variable)}>
      <body className="min-h-full">
        <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
      </body>
    </html>
  );
}
