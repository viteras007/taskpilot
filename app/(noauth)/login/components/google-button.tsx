"use client";
import { Icons } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default function GoogleButton() {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <Icons.google className="mr-2 h-4 w-4" /> Google
    </Button>
  );
}
