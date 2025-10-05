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

import { createBlog } from "@/actions/blog";

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    tags: z.string().min(1, "At least one tag is required"),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.instanceof(File).nullable().refine((file) => file !== null, { message: "Thumbnail is required" }),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function AddBlogModal() {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            tags: "",
            content: "",
            thumbnail: null,
        },
        mode: "onSubmit",
    });

    const { handleSubmit, control, formState: { errors } } = form;

    const onSubmit = async (data: BlogFormValues) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                tags: data.tags.split(",").map((t) => t.trim()),
                thumbnail,
            };

            console.log("Submitting blog:", payload);

            await createBlog(
                {
                    title: payload.title,
                    content: payload.content,
                    tags: payload.tags,
                    thumbnail: null,
                },
                thumbnail
            );

            toast.success("Blog added successfully!");
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
                <Button variant="violet">+ Add Blog</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-center mb-6 uppercase">Add New Blog</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form id="add-blog" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Blog title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. React, NextJS, Web" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <FroalaEditor
                                        tag="textarea"
                                        model={field.value}
                                        onModelChange={field.onChange}
                                        config={{
                                            placeholderText: 'Write your blog content...',
                                            height: 200,
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
                                )}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                            )}
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <SingleImageUploader
                                        onChange={(file: File) => {
                                            setThumbnail(file)
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
                        <Button variant="destructive" disabled={loading}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="add-blog" variant="violet" disabled={loading}>
                        {loading ? "Adding..." : "Add Blog"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
