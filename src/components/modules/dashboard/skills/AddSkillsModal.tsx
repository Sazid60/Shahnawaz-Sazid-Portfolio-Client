/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

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
import { createSkill } from "@/actions/skills"

const skillSchema = z.object({
  skill: z.string().min(1, "Skill name is required"),
  expertise: z.string().min(1, "Expertise level is required"),
  image: z
    .instanceof(File, { message: "Skill icon is required" })
    .nullable()
    .refine((file) => file !== null, { message: "Skill icon is required" }),
})

export type SkillFormValues = z.infer<typeof skillSchema>

export function AddSkillsModal() {
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false) 

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: { skill: "", expertise: "", image: null },
  })

  const onSubmit = async (data: SkillFormValues) => {
    setLoading(true)
    try {
      await createSkill(data, image)
      toast.success("Skill added successfully!")
      form.reset()
      setImage(null)
      setOpen(false) 
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="violet">+ Add Skill</Button>
      </DialogTrigger>

      <DialogDescription className="sr-only">
        Add the skills with skill icon and expertise level
      </DialogDescription>

      <DialogContent className="sm:max-w-[425px] bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center mb-6 uppercase">
            Add New Skill
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            id="add-skill"
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
            form="add-skill"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Skill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
