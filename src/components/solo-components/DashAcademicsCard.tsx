/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteAcademic } from "@/actions/academics";
import { Academic } from "@/types";
import UpdateAcademicModal from "../modules/dashboard/academic/UpdateAcademicModal";

export default function DashAcademics({ academics }: { academics: Academic[] }) {

    async function handleDelete(id: number) {
        try {
            toast.loading("Deleting...", { id: "academic-toast" });
            await deleteAcademic(id);
            toast.success("Academic record deleted!", { id: "academic-toast" });
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to delete", { id: "academic-toast" });
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {academics?.map((a) => (
                <div
                    key={a.id}
                    className="relative bg-white/5 rounded-md p-6 flex flex-col hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700"
                >

                    <div className="absolute top-3 right-3 flex gap-2">
                        <UpdateAcademicModal academicData={a} />
                        <button
                            onClick={() => handleDelete(a.id)}
                            className="p-1 rounded-md bg-red-600 hover:bg-red-700 shadow-[0_0_6px_rgba(239,68,68,0.7)] text-white transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>


                    <div className="flex flex-col gap-3 mt-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Degree</p>
                            <h2 className="text-lg font-bold text-white">{a.degree}</h2>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Institution</p>
                            <h3 className="text-sm text-gray-300">{a.institution}</h3>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Duration</p>
                            <p className="text-sm text-gray-400">
                                {new Date(a.startYear).toLocaleDateString(undefined, { year: "numeric" })} - {a.gradYear ? new Date(a.gradYear).toLocaleDateString(undefined, { year: "numeric" }) : "Present"}
                            </p>
                        </div>

                        {a.achievements &&
                            a.achievements.length > 0 &&
                            a.achievements[0] !== "" && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Achievements</p>
                                    <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                                        {a.achievements.map((ach, idx) => (
                                            <li key={idx}>{ach}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}


                    </div>
                </div>
            ))}
        </div>
    );
}
