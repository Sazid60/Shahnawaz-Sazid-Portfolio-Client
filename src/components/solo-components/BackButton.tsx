"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()}
      className="text-white text-md cursor-pointer transition-colors duration-300 hover:text-purple-500 select-none"
      title="Go back"
    >
      &#8592; Back
    </span>
  );
};
