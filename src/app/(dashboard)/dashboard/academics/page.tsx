import AddAcademicModal from "@/components/modules/dashboard/academic/AddAcademicModal";
import ShowAcademics from "@/components/modules/dashboard/academic/ShowAcademics";

export const metadata = {
    title: "SAZID | MANAGE-ACADEMICS",
    description: "Add, update, and manage your academic records in your dashboard.",
};

const ManageAcademics = () => {

    return (
        <div className="min-h-screen flex flex-col">

            <div className="w-full h-[30vh] flex flex-col items-center justify-center text-center bg-zinc-900/50 rounded-sm mb-6 px-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    Manage Academics
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                    Add and update your academic records to keep your profile up to date.
                </p>
                <AddAcademicModal />
            </div>

            <div className="flex-1 p-6">
                <ShowAcademics />
            </div>

        </div>
    );
};

export default ManageAcademics;
