/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import SingleImageUploader from "@/components/solo-components/SingleImageUploader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import { Experience } from "@/types"
import { updateExperience } from "@/actions/experience"

const experienceSchema = z.object({
    designation: z.string().min(1, "Designation is required"),
    company: z.string().min(1, "Company Name Required"),
    startDate: z.string().min(1, "StartDate"),
    endDate: z.string(),
    description: z.string(),
    companyLogo: z.instanceof(File).nullable(),
})

type ExperienceFormValues = z.infer<typeof experienceSchema>

interface UpdateExperienceModalProps {
    experienceData: Experience
}

export default function UpdateExperienceModal({
    experienceData,
}: UpdateExperienceModalProps) {
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
        designation: experienceData.designation,
        company: experienceData.company,
        startDate: experienceData.startDate
            ? new Date(experienceData.startDate).toISOString().split("T")[0]
            : "",
        endDate: experienceData.endDate
            ? new Date(experienceData.endDate).toISOString().split("T")[0]
            : "",
        description: experienceData.description,
        companyLogo: null,
    },
})


    const onSubmit = async (data: ExperienceFormValues) => {
        setLoading(true)
        try {
            await updateExperience(experienceData.id, data, image)
            toast.success("Experience updated successfully!")
            setOpen(false)
        } catch (err: any) {
            toast.error("Something went wrong")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="p-1 rounded-md bg-purple-600 hover:bg-purple-700 shadow-[0_0_6px_rgba(139,92,246,0.7)] text-white transition"
                >
                    <Pencil size={14} />
                </button>
            </DialogTrigger>

            <DialogDescription className="sr-only">
                Update the experience details
            </DialogDescription>

            <DialogContent className="sm:max-w-[425px] bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-center mb-4 uppercase">
                        Update Experience
                    </DialogTitle>

                    <div className="w-28 h-28 mx-auto mb-6 relative">
                        <Image
                            src={image ? URL.createObjectURL(image) : experienceData.companyLogo}
                            alt={experienceData.company}
                            fill
                            className="object-contain rounded-md"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className="space-y-4"
                        id={`update-experience-${experienceData.id}`}
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. Software Engineer" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. Google" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Worked on building scalable apps..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Logo</FormLabel>
                                    <SingleImageUploader
                                        currentImage={experienceData.companyLogo}
                                        onChange={(file: File) => {
                                            setImage(file)
                                            field.onChange(file)
                                        }}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="destructive" disabled={loading}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        variant="violet"
                        type="submit"
                        form={`update-experience-${experienceData.id}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Experience"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
