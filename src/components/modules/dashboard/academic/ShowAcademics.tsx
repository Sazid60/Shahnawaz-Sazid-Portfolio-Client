/* eslint-disable @typescript-eslint/no-explicit-any */
import DashAcademics from '@/components/solo-components/DashAcademicsCard';

const ShowAcademics = async () => {
  let academics: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic`);

    if (!res.ok) {
      console.error("Failed to fetch academics:", res.status, res.statusText);
    } else {
      const data = await res.json();
      academics = data?.data ?? [];
    }
  } catch (err) {
    console.error("Error fetching academics:", err);
  }

  if (academics.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          No Academic Records Found
        </h2>
        <p className="text-gray-500">
          Academic records will appear here once added.
        </p>
      </div>
    );
  }

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
