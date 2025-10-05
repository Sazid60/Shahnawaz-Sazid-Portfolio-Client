/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { BackButton } from "@/components/solo-components/BackButton";
import { Metadata } from "next";

interface BlogDetailsPageProps {
  params: {
    blogId: string;
  };
}




export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);

  if (!res.ok) return [];

  const json = await res.json();
  const blogs = Array.isArray(json.data) ? json.data : json;

  return blogs.map((blog: any) => ({
    blogId: String(blog.id),
  }));
};



export const metadata: Metadata = {
    title: "SHAHNAWAZ SAZID | BLOGS DETAILS",
    description: "Insights, tutorials, and thoughts I’ve shared along my journey.",
};
const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { blogId } = await params;

 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);


  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-red-400 mb-2">
          Failed to load blog details
        </h2>
        <p className="text-gray-400">Please try again later.</p>
      </div>
    );
  }

  const data = await res.json();
  const blog = data.data;

  return (
    <div className="container mx-auto my-8 md:my-16 ">
      <div className="mb-3">
        <BackButton />
      </div>
      <article className=" border rounded-sm text-gray-100 p-2 md:p-6 bg-zinc-900/50 ">
        {blog.thumbnail && (
          <div className="relative w-full h-[300px] md:h-[520px] mb-10 rounded-sm overflow-hidden group">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        <header className="mb-8 text-center">
          <h1 className="text-lg md:text-3xl font-extrabold text-white leading-tight tracking-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-xs text-gray-400">
            {blog.views ?? 0} views •{" "}
            <span className="text-purple-400 font-medium">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </header>

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 my-10 py-3 border-t border-b border-zinc-800">
            {blog.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs uppercase tracking-wide bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full hover:bg-purple-600/50 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          className=" prose prose-lg prose-invert max-w-none leading-relaxed text-gray-300 
          prose-headings:text-white prose-p:mb-6 prose-a:text-purple-400 hover:prose-a:text-purple-300
          prose-strong:text-purple-300 prose-img:rounded-lg prose-blockquote:border-l-4
          prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:text-gray-400 w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
};

export default BlogDetailsPage;
