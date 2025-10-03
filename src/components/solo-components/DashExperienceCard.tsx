/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Experience } from "@/types";
import UpdateExperienceModal from "@/components/modules/dashboard/experience/UpdateExperienceModal";
import { deleteExperience as deleteExperienceAction } from "@/actions/experience";

interface DashExperienceCardProps {
  experiences: Experience[];
}

export default function DashExperienceCard({ experiences }: DashExperienceCardProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Present";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
  };

  const handleDelete = async (id: number) => {
    try {
      toast.loading("Deleting...", { id: "exp-toast" });
      const res = await deleteExperienceAction(id);
      console.log(res);
      toast.success("Experience deleted", { id: "exp-toast" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "exp-toast" });
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {experiences.map((exp) => (
        <div
          key={exp.id}
          className="relative bg-white/5 rounded-md p-6 flex flex-col hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700"
        >
          <div className="absolute top-2 right-2 flex gap-1">
            <UpdateExperienceModal experienceData={exp} />
            <button
              onClick={() => handleDelete(exp.id)}
              className="p-1 rounded-md bg-red-600 hover:bg-red-700 shadow-[0_0_6px_rgba(239,68,68,0.7)] text-white transition"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {exp.companyLogo && (
            <div className="w-14 h-14 relative mb-4">
              <Image
                src={exp.companyLogo}
                alt={exp.company}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          <h3 className="font-semibold text-white text-lg mb-1">{exp.designation}</h3>
          <p className="text-gray-300 text-sm mb-2">{exp.company}</p>

          <div className="flex gap-2 text-gray-400 text-xs mb-2">
            <span>{formatDate(exp.startDate)}</span>
            <span>–</span>
            <span>{formatDate(exp.endDate)}</span>
            {exp.serviceDuration && <span>({exp.serviceDuration})</span>}
          </div>

          {exp.description && (
            <p className="text-gray-200 text-sm mt-2">{exp.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
