import DashSkills from '@/components/solo-components/DashSkills';
import React from 'react';

const ShowSkills = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
    next: { tags: ["SKILLS"] },
  });

  const data = await res.json();
  const skills = data.data;

  return (
    <div>
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY SKILLS
      </h1>
      <DashSkills skills={skills} />
    </div>
  );
};

export default ShowSkills;
