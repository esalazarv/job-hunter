"use client";

import { Sidenav } from "@/app/(app)/(partials)/layout/sidenav";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/ui/logout-button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidenav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-[60px] shrink-0 border-b border-border bg-background px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <Icon name="Bell" className="h-5 w-5" />
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <Icon name="Gear" className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <div className="h-5 w-px bg-border/50" />
            <LogoutButton />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
