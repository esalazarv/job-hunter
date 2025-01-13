"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "House",
  },
  {
    name: "Applications",
    href: "/applications",
    icon: "ClipboardText",
  },
  {
    name: "Companies",
    href: "/companies",
    icon: "Buildings",
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: "Users",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: "Files",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: "User",
  },
];

export function Sidenav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-[250px] flex-col bg-card border-r border-border/40 shadow-[1px_0_8px_rgba(0,0,0,0.03)]">
      {/* Logo section */}
      <div className="flex h-[60px] shrink-0 items-center border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2">
          <Icon name="Briefcase" className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            Job Hunter
          </span>
        </Link>
      </div>

      {/* Navigation section */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-3 pt-3">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon
                    name={item.icon as any}
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User section */}
        <div className="shrink-0 border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-md bg-muted p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-medium text-primary-foreground">
                E
              </span>
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium text-foreground">Eduardo</p>
              <p className="text-xs text-muted-foreground">eduardo@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
