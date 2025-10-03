/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { uploadResume } from "@/actions/resume"; 

const AddResumeSegment = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please choose a file first");
      return;
    }

    try {
      setLoading(true);
      const result = await uploadResume(file);
      toast.success(result.message || "Resume uploaded successfully!");
      setFile(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
        Manage Resume
      </h1>
      <p className="text-sm sm:text-base md:text-lg mb-4">
        Upload or update your resume in PDF format.
      </p>

      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm text-violet-900"
        />
        <Button onClick={handleSubmit} variant="violet" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </div>

      {file && (
        <p className="mt-2 text-sm text-gray-300">
          Selected file: <span className="font-semibold">{file.name}</span>
        </p>
      )}
    </div>
  );
};

export default AddResumeSegment;
