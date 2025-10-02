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

const data = {
  navMain: [
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Manage Projects",
          url: "/dashboard/projects",
        },
        {
          title: "Manage Skills",
          url: "/dashboard/manage-skills",
        },
        {
          title: "Manage Academics",
          url: "/dashboard/academics",
        },
        {
          title: "Manage Experience",
          url: "/dashboard/experience",
        },
        {
          title: "Manage Blogs",
          url: "/dashboard/blogs",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-5">
        <Link href="/">
          <Image src={Logo} width={140} height={80} alt="Logo" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
