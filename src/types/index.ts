/* eslint-disable @typescript-eslint/no-explicit-any */
export type Skill = {
    id: number
    skill: string
    expertise: string
    image: string
}

export type Experience = {
    id: number
    designation: string
    company: string
    startDate: string
    endDate?: string
    serviceDuration?: string
    description: string
    companyLogo: string
}

export interface ShowExperienceProps {
    experiences: Experience[]
}

export interface Academic {
    id: number;
    degree: string;
    institution: string;
    startYear: string;
    gradYear?: string | null;
    achievements: string[];
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface BlogFormValues {
    title: string;
    content: any;
    tags?: string[];
    featured?: boolean;
    thumbnail: File | null
}
export interface Blog {
    id: number;
    title: string;
    content: any;
    tags?: string[];
    featured?: boolean;
    thumbnail: File | null,
    views?: number
}
export interface BlogUpdateForm {
    id: number;
    title?: string;
    content?: any;
    tags?: string[];
    featured?: boolean;
    thumbnail?: File | null | string,
    views?: number
}
