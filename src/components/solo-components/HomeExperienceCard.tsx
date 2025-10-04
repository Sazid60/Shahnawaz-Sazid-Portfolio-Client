/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import { Experience } from '../../types/index';
import { motion } from "framer-motion";

interface HomeExperienceCardProps {
    experiences: Experience[];
}

export default function HomeExperienceCard({ experiences }: HomeExperienceCardProps) {
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "Present";
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {experiences.map((exp, index) => {
                const isLast = index === experiences.length - 1;
                const isFullWidth = isLast && experiences.length % 2 !== 0;

                return (
                    <motion.div
                        key={exp.id}
                        className={`relative bg-zinc-900/50  rounded-md p-6 flex flex-col hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-sm transition duration-900 ${isFullWidth ? "md:col-span-2" : ""}`}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
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
                    </motion.div>
                );
            })}
        </div>
    );
}
