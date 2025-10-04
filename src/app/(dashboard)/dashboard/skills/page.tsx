import { AddSkillsModal } from "@/components/modules/dashboard/skills/AddSkillsModal";
import ShowSkills from "@/components/modules/dashboard/skills/ShowSkills";

export const metadata = {
    title: "SAZID | MANAGE-SKILLS",
    description: "Add, update, and manage your technical skills in your dashboard.",
};

export default function ManageSkills() {
    return (
        <div className="min-h-screen flex flex-col">

            <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Manage Skills
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                    Add and update your technical skills to keep your profile up to date.
                </p>
                <AddSkillsModal />
            </div>

            <div className="flex-1">
                <ShowSkills />
            </div>

        </div>
    );
}
