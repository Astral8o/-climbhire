export const runtime = "edge";

import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-16">
        <div className="max-w-[860px] mx-auto">
          <Eyebrow className="block mb-4">Profile</Eyebrow>
          <h1 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em]">
            Coming soon.
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
