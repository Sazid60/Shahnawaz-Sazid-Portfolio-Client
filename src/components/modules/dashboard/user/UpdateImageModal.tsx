/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import SingleImageUploader from "@/components/solo-components/SingleImageUploader"
import { updateUser } from "@/actions/user" 


const imageSchema = z.object({
  image: z.instanceof(File, { message: "Profile image is required" }),
})

type ImageFormValues = z.infer<typeof imageSchema>

export default function UpdateImageModal({ userId }: { userId: number }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: undefined as unknown as File,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ImageFormValues) => {
    setLoading(true)
    try {
      await updateUser(userId, {}, file) 
      toast.success("Profile image updated!")
      setFile(null)
      setOpen(false)
    } catch (err: any) {
      toast.error(err.message || "Update failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="violet">Update Profile Image</Button>
      </DialogTrigger>

      <DialogDescription className="sr-only">
        Update your profile picture
      </DialogDescription>

      <DialogContent className="sm:max-w-[425px] bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center mb-6 uppercase">
            Update Image
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="space-y-4"
            id="update-image"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <SingleImageUploader
                    onChange={(file: File) => {
                      setFile(file)
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
            form="update-image"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
