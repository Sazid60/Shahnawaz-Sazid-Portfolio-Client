/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Trash2, ExternalLink, Server, Laptop, Layers } from "lucide-react";
import { toast } from "sonner";
import { deleteProject as deleteProjectAction } from "@/actions/project";
import UpdateProjectModal from "../modules/dashboard/project/UpdateProjectModal";

interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    frontendTechs: string;
    backendTechs: string;
    frontendRepo?: string;
    backendRepo?: string;
    liveUrl?: string;
    ieeeUrl?: string;
    thumbnail: string;
}

interface DashProjectCardProps {
    projects: Project[];
}

export default function DashProjectCard({ projects }: DashProjectCardProps) {
    const handleDelete = async (id: number) => {
        try {
            toast.loading("Deleting project...", { id: "project-toast" });
            await deleteProjectAction(id);
            toast.success("Project deleted", { id: "project-toast" });
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong", { id: "project-toast" });
        }
    };

    return (
        <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="relative bg-zinc-900/50 rounded-sm p-4 hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700"
                >

                    <div className="absolute top-8 right-8 flex gap-2 z-10">
                        <UpdateProjectModal projectData={project} />
                        <button
                            onClick={() => handleDelete(project.id)}
                            className="p-1 rounded-md bg-red-600 hover:bg-red-700 shadow-md text-white transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-full rounded-sm">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            className="rounded-sm h-[200px] md:h-[400px] w-full object-cover object-top hover:object-bottom transition-all duration-[9000ms] ease-in-out"
                            width={700}
                            height={50}
                        />
                    </div>
                    <div className="md:p-3">
                        <h1 className="text-left text-lg md:text-xl lg:text-2xl font-bold mt-3 md:mt-6">
                            <span className="text-violet-600">
                                {project.title.split("-")[0]}
                            </span>
                            {project.title.includes("-") && " - "}
                            <span className="text-white">
                                {project.title.split("-")[1]}
                            </span>
                        </h1>

                        <div className="min-h-8 md:min-h-10 lg:min-h-16">
                            <div
                                className="text-gray-300 text-sm prose prose-invert max-w-none line-clamp-4 overflow-hidden mt-6"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 mt-6">

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Layers size={30}  />
                                    <div>
                                        <p className="font-semibold text-sm">CATEGORY</p>
                                        <p className="text-xs md:text-sm font-extralight">{project.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Laptop size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">FRONTEND TECHNOLOGIES</p>
                                        <p className="text-xs md:text-sm font-extralight">{project.frontendTechs}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Server size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">BACKEND TECHNOLOGIES</p>
                                        <p className="text-xs md:text-sm font-extralight">
                                            {project.backendTechs || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {project.frontendRepo && (
                                    <div className="flex items-center gap-3">
                                        <Laptop size={30} />
                                        <div>
                                            <p className="font-semibold text-sm">FRONTEND REPO</p>
                                            <a
                                                href={project.frontendRepo}
                                                target="_blank"
                                                className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                            >
                                                View <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {project.backendRepo && (
                                    <div className="flex items-center gap-3">
                                        <Server size={30} />
                                        <div>
                                            <p className="font-semibold text-sm">BACKEND REPO</p>
                                            <a
                                                href={project.backendRepo}
                                                target="_blank"
                                                className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                            >
                                                View <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {project.liveUrl && (
                                    <div className="flex items-center gap-3">
                                        <ExternalLink size={30} />
                                        <div>
                                            <p className="font-semibold text-sm">LIVE LINK</p>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                            >
                                                View <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {project.ieeeUrl && (
                                    <div className="flex items-center gap-3">
                                        <ExternalLink size={30}/>
                                        <div>
                                            <p className="font-semibold text-sm">IEEE URL</p>
                                            <a
                                                href={project.ieeeUrl}
                                                target="_blank"
                                                className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                            >
                                                View <ExternalLink size={13} />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
