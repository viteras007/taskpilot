"use client";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
