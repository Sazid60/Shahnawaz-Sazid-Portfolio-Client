"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export type AcademicFormValues = {
  degree: string;
  institution: string;
  startYear: string;      
  gradYear?: string;      
  achievements?: string[]; 
};


export const createAcademic = async (data: AcademicFormValues) => {
  const session = await getUserSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const payload = {
    ...data,
    userId: session.user.id,
    startYear: new Date(data.startYear),
    gradYear: data.gradYear ? new Date(data.gradYear) : null,
    achievements: data.achievements || [],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.text()) || "Failed to create academic");

  const result = await res.json();

  revalidateTag("ACADEMICS");
  revalidatePath("/academics");
  revalidatePath("/dashboard/academics");

  return result;
};


export const updateAcademic = async (id: number, data: AcademicFormValues) => {
  const payload = {
    ...data,
    startYear: new Date(data.startYear),
    gradYear: data.gradYear ? new Date(data.gradYear) : null,
    achievements: data.achievements || [],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.text()) || "Failed to update academic");

  const result = await res.json();

  revalidateTag("ACADEMICS");
  revalidatePath("/academics");
  revalidatePath("/dashboard/academics");

  return result;
};


export const deleteAcademic = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) throw new Error((await res.text()) || "Failed to delete academic");

  const result = await res.json();

  revalidateTag("ACADEMICS");
  revalidatePath("/academics");
  revalidatePath("/dashboard/academics");

  return result;
};
