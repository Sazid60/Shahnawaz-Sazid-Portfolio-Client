"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Logo from "@/assets/signature-white.png";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Management",
      url: "#",
      items: [
        { title: "Manage Skills", url: "/dashboard/skills" },
        { title: "Manage Projects", url: "/dashboard/projects" },
        { title: "Manage Academics", url: "/dashboard/academics" },
        { title: "Manage Experience", url: "/dashboard/experience" },
        { title: "Manage Blogs", url: "/dashboard/blogs" },
        { title: "Manage Resume", url: "/dashboard/resume" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-5">
        <Link href="/">
          <Image src={Logo}
            width={140} alt="Logo"
            height={0}

            style={{ height: "auto" }} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`${isActive
                          ? "bg-violet-900 text-white"
                          : " hover:text-white"
                          } transition-colors`}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-500 hover:bg-red-600 hover:text-white transition-colors "
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
