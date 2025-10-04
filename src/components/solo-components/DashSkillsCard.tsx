/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import { Tooltip } from "react-tooltip"
import {  Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteSkill as deleteSkillAction } from "@/actions/skills"
import UpdateSkillModal from "@/components/modules/dashboard/skills/UpdateSkillModal"

type Skill = {
  id: number
  skill: string
  image: string
  expertise: string
}

export default function DashSkills({ skills }: { skills: Skill[] }) {
  const handleDelete = async (id: number) => {
    try {
      toast.loading("Deleting...", { id: "skill-toast" })
      const res = await deleteSkillAction(id)
      console.log(res)
      toast.success("Skill Deleted", { id: "skill-toast" })
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Something went wrong", { id: "skill-toast" })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="relative bg-zinc-900/50 rounded-sm flex justify-center items-center gap-3 flex-col p-6 hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={skill.expertise}
        >
          <div className="absolute top-2 right-2 flex gap-1">

            <UpdateSkillModal skillData={skill} />

            <button
              onClick={() => handleDelete(skill.id)}
              className="p-1 rounded-md bg-red-600 hover:bg-red-700 shadow-[0_0_6px_rgba(239,68,68,0.7)] text-white transition"
            >
              <Trash2 size={14} />
            </button>
          </div>


          <div className="relative w-20 h-20 mt-4">
            {skill.image ? (
              <Image
                src={skill.image}
                alt={skill.skill}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs">
                No Image
              </div>
            )}
          </div>
          <h1 className="text-xs md:text-sm font-extralight">{skill.skill}</h1>
        </div>
      ))}

      <Tooltip
        className="hidden lg:flex"
        style={{
          backgroundColor: "rgba(91, 33, 182)",
          color: "white",
          borderRadius: "8px",
          fontSize: "12px",
        }}
        id="my-tooltip"
      />
    </div>
  )
}
