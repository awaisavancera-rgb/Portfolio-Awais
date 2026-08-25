import type { Metadata } from "next";
import { Geist, Geist_Mono, Qwigley } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const qwigley = Qwigley({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-qwigley",
});

export const metadata: Metadata = {
  title: "Muhammad Awais | Portfolio",
  description: "Muhammad Awais - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${qwigley.variable}`}>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
