"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export type ResumeFormValues = {
  file: File | null;
};

export const uploadResume = async (file: File | null) => {
  if (!file) throw new Error("Please select a file to upload");

  const session = await getUserSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "data",
    JSON.stringify({ userId: session.user.id })
  );

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/resume`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error((await res.text()) || "Resume upload failed");

  const result = await res.json();

  revalidateTag("RESUME");
  revalidatePath("/");
  revalidatePath("/dashboard/resume");

  return result;
};


