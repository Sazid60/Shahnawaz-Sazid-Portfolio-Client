import HomeSkillCard from "@/components/solo-components/HomeSkillCard";

const HomeSkills = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skill`, {
        next: { tags: ["SKILLS"] },
    });

    const data = await res.json();
    const skills = data.data;

    return (
        <section className="my-8">
            
            <h2 className="text-2xl sm:text-3xl font-bold  mb-4 text-left uppercase">
                My Expertise
            </h2>
            <p className="text-left mb-6">
                A showcase of my technical skills and expertise.
            </p>

            <div className="mt-15">
                <HomeSkillCard skills={skills} />
            </div>
        </section>
    );
};

export default HomeSkills;
