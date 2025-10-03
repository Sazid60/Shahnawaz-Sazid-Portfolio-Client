/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateAcademic } from "@/actions/academics";
import { Academic } from "@/types";
import { Pencil } from "lucide-react";

const academicSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startYear: z.string().min(1, "Start year is required"),
  gradYear: z.string().optional(),
  achievements: z.string().optional(),
});

type AcademicFormValues = z.infer<typeof academicSchema>;

interface UpdateAcademicModalProps {
  academicData: Academic;
}

export default function UpdateAcademicModal({ academicData }: UpdateAcademicModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<AcademicFormValues>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      degree: academicData.degree,
      institution: academicData.institution,
      startYear: academicData.startYear.split("T")[0],
      gradYear: academicData.gradYear ? academicData.gradYear.split("T")[0] : "",
      achievements: academicData.achievements.join(", "),
    },
  });

  const onSubmit = async (data: AcademicFormValues) => {
    setLoading(true);
    try {
      const payload = { ...data, achievements: data.achievements?.split(",").map(a => a.trim()) || [] };
      await updateAcademic(academicData.id, payload);
      toast.success("Academic record updated successfully!");
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
        <button className="p-1 rounded-md bg-purple-600 hover:bg-purple-700 shadow-[0_0_6px_rgba(139,92,246,0.7)] text-white transition">
          <Pencil size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center uppercase mb-4">Update Academic Record</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="achievements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievements</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive" disabled={loading}>Cancel</Button>
              </DialogClose>
              <Button variant={"violet"} type="submit" disabled={loading}>{loading ? "Updating..." : "Update Academic"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
