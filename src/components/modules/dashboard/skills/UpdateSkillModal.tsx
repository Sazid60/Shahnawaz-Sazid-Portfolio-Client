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
import { Skill } from "@/types"
import { updateSkill } from "@/actions/skills"



const skillSchema = z.object({
    skill: z.string().min(1, "Skill name is required"),
    expertise: z.string().min(1, "Expertise level is required"),
    image: z.instanceof(File).nullable(),
})

type SkillFormValues = z.infer<typeof skillSchema>

interface UpdateSkillModalProps {
    skillData: Skill
}

export default function UpdateSkillModal({ skillData }: UpdateSkillModalProps) {
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            skill: skillData.skill,
            expertise: skillData.expertise,
            image: null,
        },
    })

    const onSubmit = async (data: SkillFormValues) => {
        setLoading(true);
        try {
            await updateSkill(skillData.id, data, image);
            toast.success("Skill updated successfully!");
            setOpen(false);
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
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
                Update the skill details
            </DialogDescription>

            <DialogContent className="sm:max-w-[425px] bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-center mb-4 uppercase">
                        Update Skill
                    </DialogTitle>

                    {/* Existing Image */}
                    <div className="w-28 h-28 mx-auto mb-6 relative">
                        <Image
                            src={image ? URL.createObjectURL(image) : skillData.image}
                            alt={skillData.skill}
                            fill
                            className="object-contain rounded-md"
                        />
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className="space-y-4"
                        id={`update-skill-${skillData.id}`}
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="skill"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Skill Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. React.js" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expertise Level</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Beginner / Intermediate / Advanced"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Skill Icon</FormLabel>
                                    <SingleImageUploader
                                        currentImage={skillData.image} // show current image in uploader as well
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
                        form={`update-skill-${skillData.id}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Skill"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
