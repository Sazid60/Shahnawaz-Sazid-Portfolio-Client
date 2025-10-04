/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export interface ProjectFormValues {
  title: string;
  description: string;
  category?: string;
  frontendTechs?: string;
  backendTechs?: string; 
  liveUrl?: string;
  frontendRepo?: string;
  backendRepo?: string;
  ieeeUrl?: string;
  publishedOn?: string;
}



export const createProject = async (
  data: ProjectFormValues,
  thumbnail?: File | null
) => {
  const session = await getUserSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const formData = new FormData();

  const payload = {
    ...data,
    userId: Number(session.user.id)
  };

  formData.append("data", JSON.stringify(payload));

  if (thumbnail) formData.append("file", thumbnail);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Project creation failed");
  }

  const result = await res.json();
  revalidateTag("PROJECTS");
  revalidatePath("/projects");
  revalidatePath("/dashboard/projects");

  return result;
};

export const updateProject = async (
  id: number,
  data: Partial<ProjectFormValues>,
  thumbnail?: File | null
) => {
  const formData = new FormData();

  const payload = {
    ...data
  };

  formData.append("data", JSON.stringify(payload));

  if (thumbnail) formData.append("file", thumbnail);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Project update failed");
  }

  const result = await res.json();
  revalidateTag("PROJECTS");
  revalidatePath("/projects");
  revalidatePath("/dashboard/projects");

  return result;
};

export const deleteProject = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Project deletion failed");
  }

  const result = await res.json();
  revalidateTag("PROJECTS");
  revalidatePath("/projects");
  revalidatePath("/dashboard/projects");

  return result;
};

export const getProjectById = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch project:", res.statusText);
      return null;
    }

    const result = await res.json();
    return result.data || null;
  } catch (error: any) {
    console.error("Error fetching project by ID:", error.message);
    return null;
  }
};
