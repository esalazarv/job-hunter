"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "House",
  },
  {
    name: "Applications",
    href: "/applications",
    icon: "Briefcase",
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col border-r border-border bg-card transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <div className="flex h-[60px] items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Icon name="Briefcase" className="h-5 w-5 shrink-0 text-primary" />
          <span className={cn(
            "transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            Job Hunter
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isCollapsed && "justify-center px-2",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon name={item.icon} className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <Icon name={isCollapsed ? "CaretRight" : "CaretLeft"} className="h-4 w-4 shrink-0" />
          <span className={cn(
            "transition-all duration-300",
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            Collapse sidebar
          </span>
        </button>

        <div className="p-2">
          <div className={cn(
            "flex items-center gap-3 rounded-md bg-muted p-3",
            isCollapsed && "justify-center"
          )}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-medium text-primary-foreground">
                E
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 text-sm">
                <p className="font-medium text-foreground">Eduardo</p>
                <p className="text-xs text-muted-foreground">eduardo@email.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
