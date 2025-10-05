/* eslint-disable @typescript-eslint/no-explicit-any */
import DashSkills from '@/components/solo-components/DashSkillsCard';

const ShowSkills = async () => {
  let skills: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`);

    if (!res.ok) {
      console.error("Failed to fetch skills:", res.status, res.statusText);
    } else {
      const data = await res.json();
      skills = data?.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching skills:", err);
  }

  return (
    <div>
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY SKILLS
      </h1>

      {skills.length > 0 ? (
        <DashSkills skills={skills} />
      ) : (
        <p className="text-center text-gray-400">No skills found</p>
      )}
    </div>
  );
};

export default ShowSkills;
