/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeExperienceCard from '../../solo-components/HomeExperienceCard';

const HomeExperience = async () => {
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
          No Experience Found
        </h2>
        <p className="text-gray-500">
          Professional experience will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <section className="pb-8 md:pb-20 lg:pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
        My Experience
      </h2>
      <p className="text-left mb-6 text-gray-300">
        Highlights of my journey in web development and software engineering.
      </p>

      <div className="mt-8 md:mt-15">
        <HomeExperienceCard experiences={experiences} />
      </div>
    </section>
  );
};

export default HomeExperience;
