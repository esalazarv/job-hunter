'use client';

import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function Nav() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Icon name="Briefcase" className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Job Hunter
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/applications"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="ClipboardText" />
              <span>Applications</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="User" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
