import DashAcademics from '@/components/solo-components/DashAcademicsCard';

const ShowAcademics = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic`, {
    next: { tags: ["ACADEMICS"] },
  });

  const data = await res.json();
  const academics = data.data;

  console.log(academics);

  return (
    <div>
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY ACADEMICS
      </h1>
      <DashAcademics academics={academics} />
    </div>
  );
};

export default ShowAcademics;
