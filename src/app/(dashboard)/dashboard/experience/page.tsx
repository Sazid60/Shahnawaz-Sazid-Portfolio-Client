import AddExperienceModal from "@/components/modules/dashboard/experience/AddExperienceModal";
import ShowExperience from "@/components/modules/dashboard/experience/ShowExperience";

export const metadata = {
    title: "SAZID | MANAGE-EXPERIENCE",
    description: "Add, update, and manage your professional experiences in your dashboard.",
};

export default function ManageExperience() {
    return (
        <div className="min-h-screen flex flex-col">

            <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Manage Experience
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                    Add and update your professional experiences to keep your profile up to date.
                </p>
                <AddExperienceModal />
            </div>

            <div className="flex-1">
                <ShowExperience />
            </div>

        </div>
    );
}
