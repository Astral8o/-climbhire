"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForProfessionalsPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/jobs"); }, [router]);
  return null;
}
