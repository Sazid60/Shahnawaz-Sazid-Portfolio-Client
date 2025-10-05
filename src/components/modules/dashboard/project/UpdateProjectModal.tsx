/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SingleImageUploader from "@/components/solo-components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { updateProject } from "@/actions/project";

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  frontendTechs: z.string().optional(),
  backendTechs: z.string().optional(),
  liveUrl: z.string().optional(),
  frontendRepo: z.string().optional(),
  backendRepo: z.string().optional(),
  ieeeUrl: z.string().optional(),
  publishedOn: z.string().optional(),
  thumbnail: z.instanceof(File).nullable()
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface UpdateProjectModalProps {
  projectData: any;
}

export default function UpdateProjectModal({ projectData }: UpdateProjectModalProps) {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: projectData.title,
      description: projectData.description,
      category: projectData.category,
      frontendTechs: projectData.frontendTechs || "",
      backendTechs: projectData.backendTechs || "",
      liveUrl: projectData.liveUrl || "",
      frontendRepo: projectData.frontendRepo || "",
      backendRepo: projectData.backendRepo || "",
      ieeeUrl: projectData.ieeeUrl || "",
      publishedOn: projectData.publishedOn || "",
      thumbnail: null
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const payload = data;

      await updateProject(projectData.id, payload, thumbnail);
      toast.success("Project updated successfully!");
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
        <button className="p-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white shadow">
          <Pencil size={14} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl bg-zinc-900/60 backdrop-blur-3xl rounded-sm overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center mb-6 uppercase sr-only">Update Project</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id={`update-project-${projectData.id}`} className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            {/* Title, Category, PublishedOn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField control={control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} placeholder="Project title" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl><Input {...field} placeholder="Fullstack | Frontend | Electronics" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={control} name="publishedOn" render={({ field }) => (
                <FormItem>
                  <FormLabel>Published On</FormLabel>
                  <FormControl><Input {...field} type="date" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {/* Thumbnail */}
            <FormField control={control} name="thumbnail" render={({ field }) => (
              <FormItem>
                <FormLabel>Project Thumbnail</FormLabel>
                <SingleImageUploader
                  currentImage={projectData.thumbnail}
                  onChange={(file: File) => {
                    setThumbnail(file);
                    field.onChange(file);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}/>

            {/* Description */}
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Controller name="description" control={control} render={({ field }) => (
                <>
                  <FroalaEditor
                    tag="textarea"
                    model={field.value}
                    onModelChange={field.onChange}
                    config={{
                      placeholderText: 'Write your project description...',
                      height: 90,
                      charCounterCount: false,
                      toolbarInline: false,
                      theme: 'dark',
                      editorClass: 'bg-transparent text-white placeholder-white rounded-sm p-2 border border-gray-600',
                      toolbarButtons: [
                        'bold','italic','underline','strikeThrough',
                        'formatOL','formatUL','outdent','indent',
                        'quote','insertLink','insertHR',
                        'undo','redo','html','insertCode'
                      ],
                      pluginsEnabled:['codeView','codeBeautifier','draggable','image','link'],
                    }}
                  />
                  <FormMessage />
                </>
              )}/>
            </FormItem>

            {/* All other inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {['frontendTechs','backendTechs','liveUrl','frontendRepo','backendRepo','ieeeUrl'].map(fieldName => (
                <FormField key={fieldName} control={control} name={fieldName as any} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName.replace(/([A-Z])/g, ' $1')}</FormLabel>
                    <FormControl><Input {...field} placeholder={`Enter ${fieldName}`} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              ))}
            </div>

          </form>
        </Form>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="destructive" disabled={loading}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form={`update-project-${projectData.id}`} variant="violet" disabled={loading}>
            {loading ? "Updating..." : "Update Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
