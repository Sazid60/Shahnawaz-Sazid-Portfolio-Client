import Banner from "@/components/modules/home/Banner";
import HomeSkills from "@/components/modules/home/HomeSkills";
import PortfolioHero from "@/components/modules/home/ProfileHero";


export default async function HomePage() {
    return (
        <div>
            <Banner/>
            <PortfolioHero/>
            <HomeSkills/>
        </div>
    );
}
