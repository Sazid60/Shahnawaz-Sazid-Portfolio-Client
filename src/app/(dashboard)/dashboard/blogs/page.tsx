
import AddBlogModal from "@/components/modules/dashboard/blog/AddBlogModal";
import ShowBlog from "@/components/modules/dashboard/blog/ShowBlog";

export const metadata = {
  title: "SAZID | MANAGE-BLOG",
  description: "Create, update, and manage your blogs from the dashboard.",
};

const ManageBlog = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Manage Blog
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
          Create, update, and manage your blog posts to share your knowledge and
          ideas with the world.
        </p>
        <AddBlogModal />
      </div>

      <div className="flex-1 p-6">
        <ShowBlog />
      </div>
    </div>
  );
};

export default ManageBlog;
