'use client';
import { usePathname } from "next/navigation";
import { Bars, FolderPlus, Heart, House, Layers, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const pathname = usePathname();
    const navItems = [
        { icon: House, label: "Home", href: "/dashboard/user" },
        { icon: FolderPlus, label: "Add Lesson", href: "/dashboard/add-lesson" },
        { icon: Layers, label: "My Lessons", href: "/dashboard/user/my-lessons" },
        { icon: Heart, label: "My Favorites", href: "/dashboard/user/my-favorites" },
        { icon: Person, label: "Profile", href: "/dashboard/user/profile" },

    ];
    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${pathname === item.href
                            ? "bg-emerald-600 text-white"
                            : "text-zinc-200 hover:bg-default"
                        }`}
                >
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                </Link>
            ))}
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