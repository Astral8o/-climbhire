"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForEmployersPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/employers"); }, [router]);
  return null;
}
