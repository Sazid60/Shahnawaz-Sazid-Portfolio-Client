import AddResumeSegment from "@/components/modules/dashboard/resume/AddResumeSegment";
import ResumeViewer from "@/components/modules/dashboard/resume/ResumeViewer";

export const metadata = {
    title: "SAZID | MANAGE-RESUME",
    description: "Upload or update your resume in PDF format in your dashboard.",
};

export default function ManageResume() {

    return (
        <div className="min-h-screen flex flex-col">
            <AddResumeSegment />

            <div className="flex-1 p-6">
                <ResumeViewer/>
            </div>

        </div>
    );
}
