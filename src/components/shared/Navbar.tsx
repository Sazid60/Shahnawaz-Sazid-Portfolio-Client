"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import signatureWhite from "@/assets/signature-white.png";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleSideNav = () => setIsOpen(!isOpen);
  const closeSideNav = () => setIsOpen(false);


  const navLinks = useMemo(() => {
    const links = [
      { href: "/", title: "About" },
      { href: "/projects", title: "Projects" },
      { href: "/blogs", title: "Blogs" },
      { href: "/contact", title: "Contact" },
    ];
    if (session?.user) links.push({ href: "/dashboard", title: "Dashboard" });
    return links;
  }, [session?.user]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSideNav}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xs">
        <div className="px-5 md:px-8">
          <div className="flex justify-between items-center py-4">

            <Link href="/" onClick={closeSideNav}>
              <Image src={signatureWhite} width={80} height={40} alt="Logo" />
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="relative group uppercase text-sm tracking-wide text-white"
                      >
                        {link.title}
                        <span
                          className={`absolute left-0 -bottom-0.5 h-[2px] bg-violet-600 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div>
                {session?.user ? (
                  <Button
                    variant={"violet"}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant={"violet"}>Login</Button>
                  </Link>
                )}
              </div>
            </div>

            <Button
              variant={"transp"}
              className="lg:hidden text-white px-0"
              onClick={toggleSideNav}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </Button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-64 bg-[url('/background.svg')] bg-no-repeat bg-cover backdrop-blur-md lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <div className="flex flex-col h-full px-6 py-6">
              <div className="flex justify-end">
                <Button
                  variant={"transp"}
                  onClick={toggleSideNav}
                  aria-label="Close Menu"
                >
                  <X className="text-white" size={30} />
                </Button>
              </div>
              <ul className="flex flex-col items-start gap-6 mt-10">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeSideNav}
                        className="relative group uppercase text-sm tracking-wide text-white"
                      >
                        {link.title}
                        <span
                          className={`absolute left-0 -bottom-0.5 h-[2px] bg-violet-600 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-10">
                {session?.user ? (
                  <Button
                    variant={"violet"}
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" onClick={closeSideNav}>
                    <Button variant={"violet"}>Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="pt-16" />
    </>
  );
}
