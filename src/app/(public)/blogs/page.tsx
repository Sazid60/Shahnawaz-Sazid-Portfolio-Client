import HomeBlogCard from "@/components/solo-components/HomeBlogCard";
import { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
    title: "SHAHNAWAZ SAZID | BLOGS",
    description: "Insights, tutorials, and thoughts I’ve shared along my journey.",
};

interface MyBlogsPageProps {
    searchParams?: { page?: string };
}

const MyBlogs = async ({ searchParams }: MyBlogsPageProps) => {
    const params = await searchParams;
    const page = Number(params?.page || 1);
    const limit = 9;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog?page=${page}&limit=${limit}`,
        { next: { tags: ["BLOGS"] }, }
    );

    const data = await res.json();
    const blogs = data.data;
    const totalPages = data.pagination.totalPages;

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

            <div className="flex justify-center items-center gap-3 mt-10">
                {page > 1 && (
                    <Link
                        href={`/blogs?page=${page - 1}`}
                        className="bg-violet-900 border-violet-900 text-white font-light rounded-sm px-3 py-1.5 hover:bg-violet-700 transition-colors duration-200 ease-in-out"
                    >
                        Previous
                    </Link>
                )}
                <span className="text-white">{page} / {totalPages}</span>
                {page < totalPages && (
                    <Link
                        href={`/blogs?page=${page + 1}`}
                        className=" bg-violet-900 border-violet-900 text-white font-light rounded-sm px-3 py-1.5 hover:bg-violet-700 transition-colors duration-200 ease-in-out"
                    >
                        Next
                    </Link>
                )}
            </div>
        </section>
    );
};

export default MyBlogs;
