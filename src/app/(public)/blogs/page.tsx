/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeBlogCard from "@/components/solo-components/HomeBlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SHAHNAWAZ SAZID | BLOGS",
    description: "Insights, tutorials, and thoughts I’ve shared along my journey.",
};

const MyBlogs = async () => {
    let blogs: any[] = [];

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
            next: {
                tags: ["BLOGS"],
            },
        });

        if (!res.ok) {
            console.error("Failed to fetch blogs:", res.status, res.statusText);
        } else {
            const data = await res.json();
            blogs = data?.data ?? [];
        }
    } catch (err) {
        console.error("Error fetching blogs:", err);
    }

    if (blogs.length < 1) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                    No Blogs Found
                </h2>
                <p className="text-gray-500">
                    Blogs will appear here once they are added.
                </p>
            </div>
        );
    }

    return (
        <section className="mb-5 md:mb-20 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
                My Blogs
            </h2>
            <p className="text-left mb-6 text-gray-300">
                Insights, tutorials, and thoughts I’ve shared along my journey.
            </p>

            <div className="mt-10">
                <HomeBlogCard blogs={blogs} />
            </div>
        </section>
    );
};

export default MyBlogs;
