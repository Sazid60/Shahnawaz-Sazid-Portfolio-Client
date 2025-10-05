import Banner from "@/components/modules/home/Banner";
import HomeEducation from "@/components/modules/home/HomeEducation";
import HomeExperience from "@/components/modules/home/HomeExperience";
import HomeSkills from "@/components/modules/home/HomeSkills";
import PortfolioHero from "@/components/modules/home/ProfileHero";


export default async function HomePage() {
    return (
        <div>
            <Banner/>
            <PortfolioHero/>
            <HomeSkills/>
            <HomeExperience/>
            <HomeEducation/>
        </div>
    );
}