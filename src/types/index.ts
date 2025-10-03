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
