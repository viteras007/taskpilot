import { Wrench } from "lucide-react";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-4">
          <Wrench className="h-8 w-8" /> Page Not Found
        </h1>
        <p className="text-lg leading-7 mt-6">This page does not exist</p>
      </div>
    </div>
  );
}
