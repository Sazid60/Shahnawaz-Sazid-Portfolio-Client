import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProviders from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHAHNAWAZ SAZID",
  description: "Portfolio of Shahnawaz Sazid – showcasing web development projects, skills, and experience. Explore creative solutions, innovative projects, and professional insights in modern web technologies.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preload" href="/background.svg" as="image" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[url('/background.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen`}
      >
        <AuthProviders>
          <Toaster position="bottom-right" />
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
