"use client";
import { redirect } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user } = useUser();
  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/auth/signin");
  }
}
