/* eslint-disable @typescript-eslint/no-explicit-any */
import DashProjectCard from "@/components/solo-components/DashProjectCard";

const ShowProject = async () => {
  let projects: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`);

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status, res.statusText);
    } else {
      const data = await res.json();
      projects = data?.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching projects:", err);
  }

  if (projects.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Projects Found
        </h2>
        <p className="text-gray-500">
          Your projects will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY PROJECTS
      </h1>
      <DashProjectCard projects={projects} />
    </div>
  );
};

export default ShowProject;
