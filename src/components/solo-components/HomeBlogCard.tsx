"use client";

import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DashBlogCardProps {
  blogs: Blog[];
}

export default function HomeBlogCard({ blogs }: DashBlogCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; 

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link
            href={`/blogs/${blog.id}`}
            className="relative bg-zinc-900/50 rounded-sm p-5 hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-xl transition duration-700 flex flex-col hover:cursor-pointer group"
          >
            {typeof blog.thumbnail === "string" && blog.thumbnail !== "" && (
              <div className="relative w-full h-56 overflow-hidden rounded-sm">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-sm shadow">
                  Views: {blog.views}
                </span>
              </div>
            )}

            <div className="mt-3 flex flex-col flex-1">
              <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 transition">
                {blog.title}
              </h3>

              <div
                className="text-gray-300 text-sm prose prose-invert max-w-none line-clamp-5 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-purple-600/40 text-purple-200 px-2 py-1 rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
