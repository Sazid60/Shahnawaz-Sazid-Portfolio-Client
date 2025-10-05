import Projects from "@/components/modules/home/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHAHNAWAZ SAZID | PROJECTS",
  description: "Showcasing my projects, tutorials, and insights along my journey.",
};

const MyProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    next: {
      tags: ["PROJECTS"]
    },
  });

  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-red-400 mb-2">
          Failed to load projects
        </h2>
        <p className="text-gray-400">Please try again later.</p>
      </div>
    );
  }

  const data = await res.json();
  const projects = data?.data ?? [];

  if (projects.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Projects Found
        </h2>
        <p className="text-gray-500">Projects will appear here once added.</p>
      </div>
    );
  }

  return (
    <section className="mb-5 md:mb-20 lg:mb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
        My Projects
      </h2>
      <p className="text-left mb-6 text-gray-300">
        Insights, tutorials, and projects I’ve shared along my journey.
      </p>

      <div className="mt-10">
        <Projects projects={projects} />
      </div>
    </section>
  );
};

export default MyProjects;
