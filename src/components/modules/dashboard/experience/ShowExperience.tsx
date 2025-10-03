

import DashExperienceCard from "@/components/solo-components/DashExperienceCard";

const ShowExperience = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
    next: { tags: ["EXPERIENCE"] },
  }); 

  const data = await res.json();
  const experiences= data.data;


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
