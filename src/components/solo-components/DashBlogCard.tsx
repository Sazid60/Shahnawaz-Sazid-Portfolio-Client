/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteBlog as deleteBlogAction } from "@/actions/blog";
import { Blog } from "@/types";
import UpdateBlogModal from "../modules/dashboard/blog/UpdateBlogModal";


interface DashBlogCardProps {
  blogs: Blog[];
}

export default function DashBlogCard({ blogs }: DashBlogCardProps) {
  const handleDelete = async (id: number) => {
    try {
      toast.loading("Deleting blog...", { id: "blog-toast" });
      const res = await deleteBlogAction(id);
      console.log(res);
      toast.success("Blog deleted", { id: "blog-toast" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "blog-toast" });
    }
  };

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="relative bg-zinc-900/50 rounded-md p-5 hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700 flex flex-col hover:cursor-pointer"
        >
          <div className="absolute top-9 right-9 flex gap-2 z-10">
            <UpdateBlogModal blogData={blog} />
            <button
              onClick={() => handleDelete(blog.id)}
              className="p-1 rounded-md bg-red-600 hover:bg-red-700 shadow-[0_0_6px_rgba(239,68,68,0.7)] text-white transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {typeof blog.thumbnail === "string" && blog.thumbnail !== "" && (
            <div className="relative w-full h-56">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-md shadow">
                Views: {blog.views}
              </span>
            </div>
          )}

          <div className="mt-3 flex flex-col flex-1">
            <h3 className="font-bold text-white text-md md:text-lg mb-3 line-clamp-2">
              {blog.title}
            </h3>

            <div
              className="text-gray-300 text-sm prose prose-invert max-w-none line-clamp-4 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-purple-600/40 text-purple-200 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
