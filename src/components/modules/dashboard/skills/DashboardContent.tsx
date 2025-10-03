/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/DashboardContent.tsx (Client Component)
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";


export default function DashboardContent({ session }: { session: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        className="w-full max-w-3xl bg-zinc-900/50 border border-zinc-800 rounded-sm shadow-lg px-8 py-12 flex flex-col items-center text-center space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <motion.div
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 relative rounded-full border-4 border-violet-600 shadow-md overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={session?.user?.image ?? "/default-avatar.png"}
            alt="My Profile"
            fill
            className="object-cover rounded-full"
          />
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button variant="violet">Update Profile</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-white">
            {session?.user?.name ?? "Shahnawaz Sazid"}
          </h1>
          <p className="mt-1">
            {session?.user?.email ?? "shahnawaz.sazid@example.com"}
          </p>
        </motion.div>


        <motion.blockquote
          className="italic border-l-4 border-violet-600 pl-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          &quot;The secret of getting ahead is getting started. – Mark Twain&quot;
        </motion.blockquote>
      </motion.div>
    </div>
  );
}
