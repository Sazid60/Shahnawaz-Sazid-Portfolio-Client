"use client";
import { Card } from "@/components/ui/card";
import { Code } from "lucide-react";
import { motion } from "framer-motion";

export default function PortfolioHero() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <section className="w-full text-white px-0 py-8 md:py-20 lg:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

        <motion.div
          className="flex items-center justify-center w-full lg:w-[30%]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 flex flex-col items-center gap-4 p-8 text-center text-white rounded-sm hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-xl transition duration-900">
              <div className="text-6xl md:text-7xl font-bold mb-2">{experienceYears}+</div>
              <div className="text-lg md:text-2xl font-semibold uppercase">
                Practicing <br /> Years
              </div>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 flex flex-row items-center justify-center gap-4 p-6 text-white rounded-sm hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-xl transition duration-900">
              <Code className="w-6 h-6 text-white" />
              <h1 className="text-lg md:text-xl font-semibold">Software Development</h1>
            </Card>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 w-full lg:w-[70%]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-md md:text-xl lg:text-2xl font-bold leading-tight text-balance text-violet-600 uppercase">
            Full Stack Web Developer
          </h2>

          <p className="leading-relaxed">
            Hi! My journey in web development started in{" "}
            <span className="font-semibold">{startYear}</span>, transitioning
            from <span className="font-semibold">Electrical & Electronics Engineering</span>.
            Learning web development has allowed me to connect software and
            hardware concepts more effectively, bridging the gap between
            physical systems and digital solutions.
          </p>

          <p className="leading-relaxed">
            Exploring the connections between hardware logic and web
            development, I use my engineering background to understand
            systems holistically. I focus on creating solutions that are
            practical, innovative, and scalable, constantly pushing
            beyond conventional approaches.
          </p>

          <p className="leading-relaxed italic text-gray-400">
            &quot;I may not know exactly where this journey will take me, but
            I am passionate about learning and growing every day.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
