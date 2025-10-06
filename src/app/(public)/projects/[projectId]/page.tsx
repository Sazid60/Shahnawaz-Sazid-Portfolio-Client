/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { ExternalLink, Server, Laptop, Layers } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/solo-components/BackButton";
import { Metadata } from "next";

interface ProjectDetailsPageProps {
    params: {
        projectId: string;
    };
}


export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`);

  if (!res.ok) return [];

  const json = await res.json();
  const projects = Array.isArray(json.data) ? json.data : json;

  return projects.map((project: any) => ({
    projectId: String(project.id),
  }));
};


export const metadata: Metadata = {
  title: "SHAHNAWAZ SAZID | PROJECTS DETAILS",
  description: "Showcasing my projects, tutorials, and insights along my journey.",
};

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { projectId } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);

    if (!res.ok) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-semibold text-red-400 mb-2">
                    Failed to load project details
                </h2>
                <p className="text-gray-400">Please try again later.</p>
            </div>
        );
    }

    const data = await res.json();
    const project = data.data;

    return (
        <div className="container mx-auto my-8 md:my-16">
            <div className="mb-6">
                <BackButton />
            </div>

            <div className="relative bg-zinc-900/50 rounded-sm p-4 md:p-6  shadow-2xl transition duration-700">
                <div className="flex justify-center items-center w-full rounded-sm">
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        className="rounded-sm h-[200px] md:h-[520px] w-full object-cover object-top hover:object-bottom transition-all duration-[9000ms] ease-in-out"
                        width={700}
                        height={400}
                    />
                </div>

                <div className="md:p-3">
                    <h1 className="text-left text-2xl lg:text-3xl font-bold mt-3 md:mt-6">
                        <span className="text-violet-600">{project.title.split("-")[0]}</span>
                        {project.title.includes("-") && " - "}
                        <span className="text-white">{project.title.split("-")[1]}</span>
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 mt-10">

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Layers size={30} />
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

                        {/* Right Column */}
                        <div className="space-y-6">
                            {project.frontendRepo && (
                                <div className="flex items-center gap-3">
                                    <Laptop size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">FRONTEND REPO</p>
                                        <Link
                                            href={project.frontendRepo}
                                            target="_blank"
                                            className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                        >
                                            View <ExternalLink size={18} />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {project.backendRepo && (
                                <div className="flex items-center gap-3">
                                    <Server size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">BACKEND REPO</p>
                                        <Link
                                            href={project.backendRepo}
                                            target="_blank"
                                            className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                        >
                                            View <ExternalLink size={13} />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {project.liveUrl && (
                                <div className="flex items-center gap-3">
                                    <ExternalLink size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">LIVE LINK</p>
                                        <Link
                                            href={project.liveUrl}
                                            target="_blank"
                                            className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                        >
                                            View <ExternalLink size={13} />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {project.ieeeUrl && (
                                <div className="flex items-center gap-3">
                                    <ExternalLink size={30} />
                                    <div>
                                        <p className="font-semibold text-sm">IEEE URL</p>
                                        <Link
                                            href={project.ieeeUrl}
                                            target="_blank"
                                            className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                                        >
                                            View <ExternalLink size={13} />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="font-bold uppercase mb-3">Description</h1>
                        <div
                            className="text-gray-300 text-sm prose prose-invert max-w-none  leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
