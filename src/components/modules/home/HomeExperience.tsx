import HomeExperienceCard from '../../solo-components/HomeExperienceCard';

const HomeExperience = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/experience`, {
        next: { tags: ["EXPERIENCES"] },
    });

    const data = await res.json();
    const experiences = data.data;

    return (
        <section className="pt-5 md:pt-20 lg:pt-24">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-left uppercase">
                My Professional Experience
            </h2>
            <p className="text-left mb-6 text-gray-300">
                Highlights of my journey in web development and software engineering.
            </p>


            <div className="mt-15">
                <HomeExperienceCard experiences={experiences} />
            </div>
        </section>
    );
};

export default HomeExperience;
