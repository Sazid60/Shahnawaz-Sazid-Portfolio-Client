"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong!
        </h2>
        <p className="mt-2 text-sm">
          {error.message || "An unexpected error occurred."}
        </p>

        {error.digest && (
          <p className="mt-1 text-xs ">Error ID: {error.digest}</p>
        )}

        <div className="mt-4">
          <Button variant="default" className="bg-violet-900" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
