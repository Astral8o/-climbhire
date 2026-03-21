import type { Metadata } from "next";
import { Playfair_Display, Instrument_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClimbHire — Trinidad & Tobago's Talent Platform",
  description:
    "Connect with top employers across Trinidad and Tobago. ClimbHire is the Caribbean's leading platform for ambitious professionals and forward-thinking companies.",
  openGraph: {
    title: "ClimbHire — Trinidad & Tobago's Talent Platform",
    description:
      "The Caribbean's leading talent platform. Find great jobs or hire exceptional people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${instrument.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
