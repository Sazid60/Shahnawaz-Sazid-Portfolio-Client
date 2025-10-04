
import AddProjectModal from "@/components/modules/dashboard/project/AddProjectModal";
import ShowProject from "@/components/modules/dashboard/project/ShowProject";

export const metadata = {
  title: "SAZID | MANAGE-PROJECT",
  description: "Create, update, and manage your projects from the dashboard.",
};

const ManageProject = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Manage Projects
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
          Create, update, and manage your projects to showcase your work and achievements.
        </p>
        <AddProjectModal />
      </div>

      <div className="flex-1">
        <ShowProject />
      </div>

    </div>
  );
};

export default ManageProject;
