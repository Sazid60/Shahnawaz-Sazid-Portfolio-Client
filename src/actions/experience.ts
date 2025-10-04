"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export type ExperienceFormValues = {
  designation: string;
  company: string;
  startDate: string;
  endDate?: string;
  serviceDuration?: string;
  description: string;
};


export const createExperience = async (
  data: ExperienceFormValues,
  logo?: File | null
) => {
  const session = await getUserSession();
  const formData = new FormData();

  formData.append("data", JSON.stringify({ ...data, userId: session?.user?.id }));
  if (logo) formData.append("file", logo);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error((await res.text()) || "Experience creation failed");

  const result = await res.json();
  revalidateTag("EXPERIENCES");
  revalidatePath("/");
  revalidatePath("/dashboard/experiences");

  return result;
};


export const updateExperience = async (
  id: number,
  data: ExperienceFormValues,
  logo?: File | null
) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  if (logo) formData.append("file", logo);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error((await res.text()) || "Experience update failed");

  const result = await res.json();
  revalidateTag("EXPERIENCES");
  revalidatePath("/");
  revalidatePath("/dashboard/experiences");

  return result;
};


export const deleteExperience = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) throw new Error((await res.text()) || "Experience deletion failed");

  const result = await res.json();
  revalidateTag("EXPERIENCES");
  revalidatePath("/");
  revalidatePath("/dashboard/experiences");

  return result;
};
