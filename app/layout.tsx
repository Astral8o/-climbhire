import type { Metadata } from "next";
import { Epilogue, Manrope, Cedarville_Cursive } from "next/font/google";
import "./globals.css";
const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "700"],
  display: "swap",
});
const cedarville = Cedarville_Cursive({
  subsets: ["latin"],
  variable: "--font-cedarville",
  weight: "400",
  display: "swap",
});
export const metadata: Metadata = {
  title: "ClimbHire Caribbean — Free jobs for the Caribbean",
  description:
    "ClimbHire Caribbean is a completely free job board connecting Caribbean job seekers with verified regional employers. No fees, no subscriptions, no catch.",
  openGraph: {
    title: "ClimbHire Caribbean — Free jobs for the Caribbean",
    description:
      "Free for everyone. Always. Browse jobs or post up to 3 roles free.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} ${cedarville.variable}`}
    >
      <body className="font-body bg-cream text-ink">{children}</body>
    </html>
  );
}
