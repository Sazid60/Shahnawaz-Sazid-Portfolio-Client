import HomeEducationCard from "@/components/solo-components/HomeEducationCard";

const HomeEducation = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/academic`, {
        next: { tags: ["EDUCATION"] },
    });

    const data = await res.json();
    const education = data.data;

    return (
        <section className="py-5 md:py-20 lg:py-24">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
                My Education
            </h2>
            <p className="text-left mb-6 text-gray-300">
                A brief overview of my academic background and learning journey.
            </p>

            <div className="mt-15">
                <HomeEducationCard academics={education} />
            </div>
        </section>
    );
};

export default HomeEducation;
