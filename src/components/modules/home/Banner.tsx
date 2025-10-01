// components/Banner.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import profileImage from "@/assets/sazid.webp";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Phone, Download } from "lucide-react";

export default function Banner() {
    const socialLinks = [
        { icon: Facebook, url: "https://www.facebook.com/shahnawaz.sazid.71/" },
        { icon: Linkedin, url: "https://www.linkedin.com/in/shahnawaz-sazid/" },
        { icon: Github, url: "https://github.com/Sazid60" },
        { icon: Phone, url: "tel:+8801639768727" },
    ];

    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-center text-white gap-10 container mx-auto">
            <motion.div
                className="max-w-xl text-center md:text-left space-y-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-violet-600 font-semibold text-lg">Fullstack Dev</h3>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Hey! I&apos;m <br />
                    <span className="text-violet-600">Shahnawaz Sazid</span>
                </h1>
                <p>
                    A Full Stack Web Developer passionate about building modern, scalable web applications. I work on both frontend and backend, crafting engaging user interfaces while building robust, efficient server-side systems that work seamlessly together.
                </p>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Button variant="violet" className="mt-4">
                        <Download size={24}/> Resume
                    </Button>
                </motion.div>
            </motion.div>
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Image
                    src={profileImage}
                    alt="Shahnawaz Sazid"
                    className="rounded-full shadow-2xl w-60 h-60 md:w-72 md:h-72 object-cover  border-4 border-violet-600"
                    width={300}
                    height={300}
                    priority
                />
                <motion.div
                    className="flex gap-4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.url}
                                target={Icon === Phone ? "_self" : "_blank"}
                                rel={Icon === Phone ? undefined : "noreferrer"}
                                className="text-white hover:text-violet-500 transition-colors"
                            >
                                <Icon size={32} />
                            </a>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}
