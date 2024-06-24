"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  return (
    <main className="flex w-full h-screen justify-center items-center">
      <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Login
      </Button>
    </main>
  );
}
