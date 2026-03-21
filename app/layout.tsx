import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ClimbHire — Find Your Next Climb",
  description:
    "Discover top tech jobs and take your career to new heights. ClimbHire connects ambitious professionals with the companies that will help them grow.",
  openGraph: {
    title: "ClimbHire — Find Your Next Climb",
    description:
      "Discover top tech jobs and take your career to new heights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
