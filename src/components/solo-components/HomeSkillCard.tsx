"use client"
import Image from "next/image"
import { Tooltip } from "react-tooltip"
import { motion } from "framer-motion"

type Skill = {
  id: number
  skill: string
  image: string
  expertise: string
}

export default function HomeSkillCard({ skills }: { skills: Skill[] }) {
  return (
    <div
      className="
        flex flex-wrap justify-center gap-4 lg:gap-8 xl:gap-11 w-full"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          className="
            bg-zinc-900/50 rounded-sm flex justify-center items-center
            flex-col gap-3 p-6 
            hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)]
            shadow-xl transition duration-900
            w-[45%] sm:w-[30%] md:w-[22%] lg:w-[17%]
          "
          data-tooltip-id="my-tooltip"
          data-tooltip-content={skill.expertise}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
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
          <h1 className="text-xs md:text-sm font-extralight">
            {skill.skill}
          </h1>
        </motion.div>
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
