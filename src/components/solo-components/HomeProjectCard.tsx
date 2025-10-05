"use client";

import Image from "next/image";
import { ExternalLink, Server, Laptop, Layers } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function HomeProjectCard({ projects }: DashProjectCardProps) {
  const router = useRouter();

  return (
    <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
      {projects.map((project) => (
        <div
          key={project.id}
          role="button"
          onClick={() => router.push(`/projects/${project.id}`)}
          className="cursor-pointer relative bg-zinc-900/50 rounded-sm p-4 hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-700"
        >
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
              <span className="text-violet-600">{project.title.split("-")[0]}</span>
              {project.title.includes("-") && " - "}
              <span className="text-white">{project.title.split("-")[1]}</span>
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

              <div className="space-y-4">
                {project.frontendRepo && (
                  <div className="flex items-center gap-3">
                    <Laptop size={30} />
                    <div>
                      <p className="font-semibold text-sm">FRONTEND REPO</p>
                      <Link
                        href={project.frontendRepo}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs md:text-sm font-light text-violet-600 hover:text-white/65 flex items-center gap-2"
                      >
                        View <ExternalLink size={13} />
                      </Link>
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
