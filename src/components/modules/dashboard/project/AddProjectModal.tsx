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

import { createProject } from "@/actions/project";

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
    thumbnail: z.instanceof(File).nullable().refine((file) => file !== null, { message: "Thumbnail is required" }),
    features: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AddProjectModal() {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            frontendTechs: "",
            backendTechs: "",
            liveUrl: "",
            frontendRepo: "",
            backendRepo: "",
            ieeeUrl: "",
            publishedOn: "",
            thumbnail: null,
            features: "",
        },
        mode: "onSubmit",
    });

    const { handleSubmit, control } = form;

    const onSubmit = async (data: ProjectFormValues) => {
        setLoading(true);
        try {
            await createProject(
                {
                    ...data,
                    frontendTechs: data.frontendTechs || "",
                    backendTechs: data.backendTechs || "",
                },
                thumbnail
            );

            toast.success("Project added successfully!");
            form.reset();
            setThumbnail(null);
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
                <Button variant="violet">+ Add Project</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl bg-zinc-900/60 backdrop-blur-3xl rounded-sm overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-center mb-6 uppercase sr-only">Add New Project</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form id="add-project" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>


                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <FormField
                                control={control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Project title" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Fullstack | Frontend | Electronics" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="publishedOn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Published On</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Thumbnail</FormLabel>
                                    <SingleImageUploader
                                        onChange={(file: File) => {
                                            setThumbnail(file);
                                            field.onChange(file);
                                        }}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
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
                                                    'bold', 'italic', 'underline', 'strikeThrough',
                                                    'formatOL', 'formatUL', 'outdent', 'indent',
                                                    'quote', 'insertLink', 'insertHR',
                                                    'undo', 'redo', 'html', 'insertCode'
                                                ],
                                                pluginsEnabled: [
                                                    'codeView', 'codeBeautifier', 'draggable', 'image', 'link'
                                                ],
                                            }}
                                        />
                                        <FormMessage>
                                            {form.formState.errors.description?.message}
                                        </FormMessage>
                                    </>
                                )}
                            />
                        </FormItem>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <FormField
                                control={control}
                                name="frontendTechs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Frontend Techs</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="React, NextJS" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="backendTechs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backend Techs</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="NodeJS, Express" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="liveUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Live URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="https://example.com" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="frontendRepo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Frontend Repo</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="https://github.com/frontend" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="backendRepo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Backend Repo</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="https://github.com/backend" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="ieeeUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>IEEE URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="https://ieeexplore.ieee.org/..." />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                    </form>
                </Form>

                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="destructive" disabled={loading}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="add-project" variant="violet" disabled={loading}>
                        {loading ? "Adding..." : "Add Project"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
