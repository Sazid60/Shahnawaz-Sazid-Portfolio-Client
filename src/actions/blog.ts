/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { BlogFormValues, BlogUpdateForm } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";



export const createBlog = async (data: Omit<BlogFormValues, "tags"> & { tags: string[] }, thumbnail?: File | null) => {
  const session = await getUserSession();
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      featured: false,
      authorId: Number(session?.user?.id),
    })
  );

  if (thumbnail) formData.append("file", thumbnail);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text() || "Blog creation failed");

  const result = await res.json();
  revalidateTag("BLOGS");
  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");

  return result;
};


export const updateBlog = async (id: number, data: BlogUpdateForm, thumbnail?: File | null) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));

  if (thumbnail) formData.append("file", thumbnail);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text() || "Blog update failed");

  const result = await res.json();
  revalidateTag("BLOGS");
  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");

  return result;
};


export const deleteBlog = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) throw new Error(await res.text() || "Blog deletion failed");

  const result = await res.json();

  revalidateTag("BLOGS");
  revalidatePath("/blogs");
  revalidatePath("/dashboard/blogs");

  return result;
};

export const getBlogById = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch blog:", res.statusText);
      return null;
    }

    const result = await res.json();
    return result.data || null;
  } catch (error: any) {
    console.error("Error fetching blog by ID:", error.message);
    return null;
  }
};
