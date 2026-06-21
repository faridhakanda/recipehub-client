

//import { getUserSession } from "@/lib/core/session";
//import { auth } from "@/lib/auth";
//import { getUserSession } from "@/lib/core/session";
import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell,Briefcase, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
//import { getSession } from "better-auth/api";
import Link from "next/link";

export async function DashboardSidebar() {
    
    const user = await getUserSession();
    const userItems = [
        { icon: House, href: "/dashboard/user", label: "Home" },
        { icon: Magnifier, href: "/dashboard/user/recipe", label: "Recipe" },
        { icon: Person, href: "/dashboard/user/saved-recipe", label: 'Saved Recipe'},
        { icon: Bell, href: "/dashboard/user/add-recipe", label: "Add Recipe" },
        { icon: Briefcase, href: "/dashboard/user/favorite", label: "Favorite Recipe" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]
    // const recruiterItems = [
    //     { icon: House, href: "/dashboard/recruiter", label: "Home" },
    //     { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    //     { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    //     { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Recruiter Profile" },
    //     { icon: Envelope, href: "/messages", label: "Messages" },
    //     { icon: Person, href: "/profile", label: "Profile" },
    //     { icon: Gear, href: "/settings", label: "Settings" },
    // ]
    const adminItems = [
        { icon: House, href: "/dashboard/admin", label: "Home" },
        { icon: Magnifier, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: Bell, href: "/dashboard/admin/jobs/new", label: "Post A Job" },
        { icon: Briefcase, href: "/dashboard/admin/companies", label: "Admin Company" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Person, href: "/dashboard/admin/users", label: "Users" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]
    // const navItems = [
    //     { icon: House, href: "/dashboard", label: "Home" },
    //     { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    //     { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    //     { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    //     { icon: Envelope, href: "/messages", label: "Messages" },
    //     { icon: Person, href: "/profile", label: "Profile" },
    //     { icon: Gear, href: "/settings", label: "Settings" },
    // ];
    const navLinksMap = {
        user: userItems,
        //recruiter: recruiterItems,
        admin: adminItems
    }
    const navItems = navLinksMap[user?.role || "user"];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Dashboard</Drawer.Heading>
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