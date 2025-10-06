/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeSkillCard from "@/components/solo-components/HomeSkillCard";

const HomeSkills = async () => {
  let skills: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`);

    if (!res.ok) {
      console.error("Failed to fetch skills:", res.status, res.statusText);
    } else {
      const data = await res.json();
      skills = data?.data?.reverse() ?? [];
    }
  } catch (err) {
    console.error("Error fetching skills:", err);
  }

  if (skills.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Skills Found
        </h2>
        <p className="text-gray-500">
          Skills will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <section className="pb-8 md:pb-20 lg:pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
        My Expertise
      </h2>
      <p className="text-left mb-6">
        A showcase of my technical skills and expertise.
      </p>

      <div className="mt-8 md:mt-15">
        <HomeSkillCard skills={skills} />
      </div>
    </section>
  );
};

export default HomeSkills;
