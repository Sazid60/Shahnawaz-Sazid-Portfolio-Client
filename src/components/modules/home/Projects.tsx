"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import HomeProjectCard from "@/components/solo-components/HomeProjectCard";

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

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    const [tab, setTab] = useState("All");

    const filterProjectsByCategory = (category: string) => {
        if (category === "All") return projects;
        return projects.filter(
            (project) => project.category.toUpperCase() === category.toUpperCase()
        );
    };

    const categories = ["All", "Fullstack", "Frontend", "Electronics"];

    return (
        <div className="mt-8 md:mt-16">
            <Tabs value={tab} onValueChange={setTab} className="space-y-4">
                <TabsList className="grid grid-cols-4 bg-transparent border rounded-sm w-full md:max-w-sm">
                    {categories.map((category) => (
                        <TabsTrigger
                            key={category}
                            value={category}
                            className={`text-center transition-colors ${tab === category
                                    ? "text-violet-600 font-semibold text-sm"
                                    : "bg-transparent"
                                } rounded-md`}
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                        <HomeProjectCard projects={filterProjectsByCategory(category)} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
