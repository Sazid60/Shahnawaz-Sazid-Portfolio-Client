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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createExperience } from "@/actions/experience"

const experienceSchema = z.object({
  designation: z.string().min(1, "Designation required"),
  company: z.string().min(1, "Company name required"),
  startDate: z.string().min(1, "Date required"),
  endDate: z.string().optional(),
  serviceDuration: z.string().optional(),
  description: z.string(),
  companyLogo: z.instanceof(File),
});



export type ExperienceFormValues = z.infer<typeof experienceSchema>

export default function AddExperienceModal() {
  const [logo, setLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      designation: "",
      company: "",
      startDate: "",
      endDate: "",
      serviceDuration: "",
      description: "",
    },
  })

  const onSubmit = async (data: ExperienceFormValues) => {
    setLoading(true)
    try {
      await createExperience(data, logo)
      toast.success("Experience added successfully!")
      form.reset()
      setLogo(null)
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || "Something went wrong")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="violet">+ Add Experience</Button>
      </DialogTrigger>

      <DialogDescription className="sr-only">
        Add your professional experience
      </DialogDescription>

      <DialogContent className="sm:max-w-[425px] bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center mb-6 uppercase">
            Add New Experience
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            id="add-experience"
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
                      <Input {...field} type="date" />
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
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="serviceDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 2 years 3 months" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Brief description of role" />
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
                    onChange={(file: File) => {
                      setLogo(file)
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
            form="add-experience"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Experience"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
