"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image as ImageIcon,
} from "lucide-react";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconArrowLeftFromArc, IconUser } from "@tabler/icons-react";

const projects = [
  { name: "Profile", url: "/admin/profile", icon: IconUser },
  { name: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { name: "Products", url: "/admin/product", icon: Package },
  { name: "Categories", url: "/admin/Categories", icon: FolderTree },
  { name: "Media Manager", url: "/admin/media", icon: ImageIcon },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <ShadSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold py-8">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent className="border-t pt-4">
            <SidebarMenu>
              {projects.map((project) => {
                const isActive = pathname === project.url;
                const Icon = project.icon;
                return (
                  <SidebarMenuItem key={project.name} className="mt-4">
                    <SidebarMenuButton asChild>
                      <Link
                        href={project.url}
                        className={`flex items-center gap-5 px-3 py-2 rounded-lg transition-all
                                              ${isActive
                            ? "bg-sky-600 text-white pointer-events-none"
                            : "hover:bg-sky-100"
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-lg">{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Link href="/">
        <div className="p-1 border-t flex justify-center">
          <Button className="bg-transparent text-black text-center gap-2 py-4 hover:bg-orange-400 w-full">
            <IconArrowLeftFromArc />
            Back to Site
          </Button>
        </div>
      </Link>

      <div className="p-1 pb-2 border-t flex justify-center">
        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-transparent text-black text-center gap-2 py-4 hover:bg-red-600 w-full">
          <IconArrowLeftFromArc />
          Logout
        </Button>
      </div>
    </ShadSidebar>
  );
};

export default Sidebar;
