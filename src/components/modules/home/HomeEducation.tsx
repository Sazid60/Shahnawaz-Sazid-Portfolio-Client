/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeEducationCard from "@/components/solo-components/HomeEducationCard";

const HomeEducation = async () => {
  let education: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic`, {next: {tags: ["ACADEMICS"] }});

    if (!res.ok) {
      console.error("Failed to fetch education:", res.status, res.statusText);
    } else {
      const data = await res.json();
      education = data?.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching education:", err);
  }

  if (education.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Education Records Found
        </h2>
        <p className="text-gray-500">
          Academic records will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <section className="pb-8 md:pb-20 lg:pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
        My Education
      </h2>
      <p className="text-left mb-6 text-gray-300">
        A brief overview of my academic background and learning journey.
      </p>

      <div className="mt-8 md:mt-15">
        <HomeEducationCard academics={education} />
      </div>
    </section>
  );
};

export default HomeEducation;
