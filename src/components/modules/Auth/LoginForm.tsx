"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", 
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);

      toast.loading("Logging in...", { id: "login-toast" });

      const res = await signIn("credentials", {
        ...values,
        redirect: false, 
      });

      if (res?.ok) {
        toast.success("Login Successful ", { id: "login-toast" });
        router.push("/dashboard");
      } else {
        toast.error("Invalid email or password ", { id: "login-toast" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!", { id: "login-toast" });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.watch("email") && form.watch("password");

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="space-y-6 w-full max-w-md p-8 rounded-sm shadow-md bg-zinc-900/50 border-zinc-800">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center">ADMIN LOGIN</h2>

            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-violet-600">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm"
                      type="email"
                      placeholder="Enter your email"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }} 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-violet-600">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm"
                      type="password"
                      placeholder="Enter your password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="violet"
              type="submit"
              className="w-full mt-2 flex items-center justify-center"
              disabled={!isFormValid || loading} 
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
