"use client";

import { motion } from "framer-motion";
import { Academic } from "@/types";

export default function HomeEducationCard({ academics }: { academics: Academic[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {academics?.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
          className="relative bg-zinc-900/50  rounded-md p-6 flex flex-col hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-sm transition duration-900"
        >
          <div className="flex flex-col gap-3 mt-4 space-y-2">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Degree</p>
              <h2 className="text-lg font-bold text-white">{a.degree}</h2>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Institution</p>
              <h3 className="text-sm text-gray-300">{a.institution}</h3>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Duration</p>
              <p className="text-sm">
                {new Date(a.startYear).toLocaleDateString(undefined, { year: "numeric" })} -{" "}
                {a.gradYear
                  ? new Date(a.gradYear).toLocaleDateString(undefined, { year: "numeric" })
                  : "Present"}
              </p>
            </div>

            {a.achievements &&
              a.achievements.length > 0 &&
              a.achievements[0] !== "" && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Achievements</p>
                  <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                    {a.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
