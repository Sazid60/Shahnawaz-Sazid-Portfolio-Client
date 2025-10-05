/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { sendContactMessage } from "@/actions/contact";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email Is Required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data : any) => {
    setLoading(true);
    try {
      await sendContactMessage(data as ContactFormValues); 
      toast.success("Message sent successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center text-white space-y-6">
          <h2 className="text-4xl font-extrabold">Let&apos;s Connect</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Feel free to contact me for any inquiries, collaborations, or just to say hello. I’ll get back to you as soon as possible!
          </p>
          <p className="text-gray-400 italic">
            &quot;Creativity is intelligence having fun.&quot; – Albert Einstein
          </p>
        </div>

        <div className="rounded-sm ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your Name.." className="bg-zinc-900/30 border-gray-700 text-white rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="example@gmail.com" className="bg-zinc-900/30 border-gray-700 text-white rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+88016...." className="bg-zinc-900/30 border-gray-700 text-white rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Hi, I am interested..." className="bg-zinc-900/30 border-gray-700 text-white rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
              className="w-full"
                type="submit"
                variant={"violet"}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
