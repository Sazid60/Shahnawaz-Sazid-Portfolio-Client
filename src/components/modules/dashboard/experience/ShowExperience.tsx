/* eslint-disable @typescript-eslint/no-explicit-any */
import DashExperienceCard from "@/components/solo-components/DashExperienceCard";

const ShowExperience = async () => {
  let experiences: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`);

    if (!res.ok) {
      console.error("Failed to fetch experiences:", res.status, res.statusText);
    } else {
      const data = await res.json();
      experiences = data?.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching experiences:", err);
  }

  if (experiences.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Experiences Found
        </h2>
        <p className="text-gray-500">
          Your professional experiences will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY EXPERIENCES
      </h1>
      <DashExperienceCard experiences={experiences} />
    </div>
  );
};

export default ShowExperience;
