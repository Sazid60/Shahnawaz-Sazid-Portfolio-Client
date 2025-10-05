"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactFormSection from "@/components/solo-components/ContactForm";

const ContactPage = () => {
  return (
    <section className="py-0 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a
          href="mailto:shahnawazsazid60@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="bg-zinc-900/50 border-none text-center hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-900 cursor-pointer rounded-sm">
            <CardHeader>
              <Mail className="w-12 h-12 text-white mx-auto mb-2 transition-colors group-hover:text-violet-500" />
              <CardTitle className="text-xl font-bold text-white">E-Mail</CardTitle>
            </CardHeader>
            <CardContent className=" sr-only text-sm text-gray-300">
              shahnawazsazid60@gmail.com
            </CardContent>
          </Card>
        </a>

        <a href="tel:+8801639768727" className="group">
          <Card className="bg-zinc-900/50 border-none text-center hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-900 cursor-pointer rounded-sm">
            <CardHeader>
              <Phone className="w-12 h-12 text-white mx-auto mb-2 transition-colors group-hover:text-violet-500" />
              <CardTitle className="text-xl font-bold text-white">Call Me</CardTitle>
            </CardHeader>
            <CardContent className=" sr-only text-sm text-gray-300">
              +8801639768727
            </CardContent>
          </Card>
        </a>

        <a
          href="https://wa.me/8801639768727?text=Hi%20Shahnawaz!"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="bg-zinc-900/50 border-none text-center hover:shadow-[0_0_10px_2px_rgba(139,92,246,0.7)] shadow-2xl transition duration-900 cursor-pointer rounded-sm">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-white mx-auto mb-2 transition-colors group-hover:text-violet-500" />
              <CardTitle className="text-xl font-bold text-white">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className=" sr-only text-sm text-gray-300">
              Chat with me
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="bg-zinc-900/50 p-0 lg:p-10 rounded-md   shadow-sm ">
      <ContactFormSection/>
      </div>
    </section>
  );
};

export default ContactPage;
