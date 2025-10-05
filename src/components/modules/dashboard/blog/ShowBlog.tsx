/* eslint-disable @typescript-eslint/no-explicit-any */
import DashBlogCard from "@/components/solo-components/DashBlogCard";

const ShowBlog = async () => {
  let blogs: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);

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
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Blogs Found
        </h2>
        <p className="text-gray-500">
          Blogs will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY BLOGS
      </h1>
      <DashBlogCard blogs={blogs} />
    </div>
  );
};

export default ShowBlog;
