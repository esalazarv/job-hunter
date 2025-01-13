import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidenav } from "@/components/layout/sidenav";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Hunter",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full overflow-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    <Icon name="SignOut" className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
