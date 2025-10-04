import DashProjectCard from "@/components/solo-components/DashProjectCard";

const ShowProject = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    next: { tags: ["PROJECTS"] },
  });

  const data = await res.json();
  const projects = data.data;

  console.log(projects)

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
