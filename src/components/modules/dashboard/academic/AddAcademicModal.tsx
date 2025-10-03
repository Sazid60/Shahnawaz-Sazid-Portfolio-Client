/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createAcademic } from "@/actions/academics";

const academicSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startYear: z.string().min(1, "Start year is required"),
  gradYear: z.string().optional(),
  achievements: z.string().optional(),
});

type AcademicFormValues = z.infer<typeof academicSchema>;

export default function AddAcademicModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<AcademicFormValues>({
    resolver: zodResolver(academicSchema),
    defaultValues: { degree: "", institution: "", startYear: "", gradYear: "", achievements: "" },
  });

  const onSubmit = async (data: AcademicFormValues) => {
    setLoading(true);
    try {
      const payload = { ...data, achievements: data.achievements?.split(",").map(a => a.trim()) || [] };
      await createAcademic(payload);
      toast.success("Academic record added successfully!");
      setOpen(false);
      form.reset();
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
        <Button variant={"violet"}>+ Add Academic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-center uppercase mb-4">Add Academic Record</DialogTitle>
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
                  <FormControl>
                    <Input {...field} placeholder="Dean's Award, Math Olympiad" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive" disabled={loading}>Cancel</Button>
              </DialogClose>
              <Button variant={"violet"} type="submit" disabled={loading}>{loading ? "Adding..." : "Add Academic"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
