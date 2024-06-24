"use client";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <>
      <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
        Logout
      </DropdownMenuItem>
    </>
  );
}
