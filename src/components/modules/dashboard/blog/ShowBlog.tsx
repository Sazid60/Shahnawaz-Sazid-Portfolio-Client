import DashBlogCard from "@/components/solo-components/DashBlogCard";

const ShowBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    next: { tags: ["BLOGS"] },
  });

  const data = await res.json();
  const blogs = data.data;

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
