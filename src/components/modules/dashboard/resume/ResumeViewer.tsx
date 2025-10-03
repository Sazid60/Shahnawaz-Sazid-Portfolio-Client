import React from "react";

const ShowResume = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/resume`, {
    next: { tags: ["RESUME"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch resume");
  }

  const data = await res.json();
  const resume = data.data;

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 lg:mb-10">
        MY RESUME
      </h1>

      {resume?.resumeUrl ? (
        <div className="w-full max-w-4xl h-[80vh] border border-gray-700 rounded-md overflow-hidden shadow-lg">
          <iframe
            src={resume.resumeUrl}
            className="w-full h-full"
            title="Resume PDF"
          />
        </div>
      ) : (
        <p className="text-center text-gray-400">No resume uploaded</p>
      )}

      {resume?.resumeUrl && (
        <a
          href={resume.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md shadow"
        >
          Open Fullscreen PDF
        </a>
      )}
    </div>
  );
};

export default ShowResume;
