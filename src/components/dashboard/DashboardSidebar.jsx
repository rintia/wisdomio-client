'use client';
import { usePathname } from "next/navigation";
import {
    Bars, FolderPlus, Heart, Layers, Person, House,
    Persons,
    BookOpen,
    TriangleExclamation,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const user = session?.user;

    const userLinks = [
        { icon: House, label: "Home", href: "/dashboard/user" },
        { icon: FolderPlus, label: "Add Lesson", href: "/dashboard/add-lesson" },
        { icon: Layers, label: "My Lessons", href: "/dashboard/user/my-lessons" },
        { icon: Heart, label: "My Favorites", href: "/dashboard/user/my-favorites" },
        { icon: Person, label: "Profile", href: "/dashboard/user/profile" },

    ];

    const adminLinks = [
        {
            label: "Dashboard",
            href: "/dashboard/admin",
            icon: House,
        },
        {
            label: "Manage Users",
            href: "/dashboard/admin/manage-users",
            icon: Persons,
        },
        {
            label: "Manage Lessons",
            href: "/dashboard/admin/manage-lessons",
            icon: BookOpen,
        },
        {
            label: "Reported Lessons",
            href: "/dashboard/admin/reported-lessons",
            icon: TriangleExclamation,
        },
        {
            label: "Profile",
            href: "/dashboard/user/profile",
            icon: Person,
        }
    ];

    const navLinks =
        user?.role === "admin"
            ? adminLinks
            : userLinks;



    const navContent = (
        <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
                const Icon = item.icon;

                const isActive =
                    item.href === "/dashboard/admin" ||
                        item.href === "/dashboard/user"
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive
                            ? "bg-emerald-600 text-white"
                            : "text-zinc-200 hover:bg-default"
                            }`}
                    >
                        <Icon className="size-5" />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    )



    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>

            <Drawer>
                <Button className='lg:hidden' variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}