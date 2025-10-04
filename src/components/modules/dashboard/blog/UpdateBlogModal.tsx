/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";

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
import { BlogUpdateForm } from "@/types";
import { updateBlog } from "@/actions/blog";

const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    tags: z.string().min(1, "At least one tag is required"),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.instanceof(File).nullable(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface UpdateBlogModalProps {
    blogData: BlogUpdateForm;
}

export default function UpdateBlogModal({ blogData }: UpdateBlogModalProps) {
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const imageSrc = thumbnail ? URL.createObjectURL(thumbnail) :blogData.thumbnail as string ;

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: blogData.title,
            tags: (blogData.tags || []).join(", "),
            content: blogData.content,
            thumbnail: null
        },
    });

    const { handleSubmit, control } = form;

    const onSubmit = async (data: BlogFormValues) => {
        setLoading(true);
        try {
            const payload: any = {};

            if (data.title && data.title !== blogData.title) payload.title = data.title;
            if (data.content && data.content !== blogData.content) payload.content = data.content;
            if (data.tags && data.tags.split(",").map(t => t.trim()).join(",") !== (blogData.tags || []).join(",")) {
                payload.tags = data.tags.split(",").map(t => t.trim());
            }

            await updateBlog(blogData.id, payload, thumbnail);

            toast.success("Blog updated successfully!");
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

            <DialogContent className="sm:max-w-2xl bg-zinc-900/60 backdrop-blur-3xl rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-center mb-6 uppercase">Update Blog</DialogTitle>

                    <div className="w-full h-28 mx-auto mb-6 relative">
                        {imageSrc && (
                            <Image
                                src={imageSrc}
                                alt={blogData.title || "Alternative Image"}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                unoptimized
                            />
                        )}
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className="space-y-4"
                        id={`update-blog-${blogData.id}`}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Title */}
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

                        <FormField
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <FroalaEditor
                                            tag="textarea"
                                            model={field.value}
                                            onModelChange={field.onChange}
                                            config={{
                                                placeholderText: 'Write your blog content...',
                                                height: 100,
                                                charCounterCount: false,
                                                toolbarInline: false,
                                                theme: 'dark',
                                                editorClass: 'bg-transparent text-white rounded-sm p-2 border border-gray-600',
                                                toolbarButtons: [
                                                    'bold', 'italic', 'underline', 'strikeThrough',
                                                    'formatOL', 'formatUL', 'outdent', 'indent',
                                                    'quote', 'insertLink', 'insertHR',
                                                    'undo', 'redo', 'html', 'insertCode'
                                                ],
                                                pluginsEnabled: ['codeView', 'codeBeautifier', 'draggable', 'image', 'link'],
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <SingleImageUploader
                                        currentImage={blogData.thumbnail}
                                        onChange={(file: File) => {
                                            setThumbnail(file);
                                            field.onChange(file);
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

                    <Button
                        variant="violet"
                        type="submit"
                        form={`update-blog-${blogData.id}`}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Blog"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
