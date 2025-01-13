"use client";

import { useAuth } from "@/hooks/use-auth";
import { Icon } from "@/components/ui/icon";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="text-sm text-muted-foreground hover:text-foreground"
    >
      <Icon name="SignOut" className="h-5 w-5" />
    </button>
  );
}
