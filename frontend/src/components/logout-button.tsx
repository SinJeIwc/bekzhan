"use client";

import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { LogOut } from "@/components/animate-ui/icons/log-out";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function LogoutButton() {
  const { isOwner, logout } = useAuth();

  if (!isOwner) return null;

  return (
    <AnimateIcon animateOnHover asChild>
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={logout}
        aria-label="Logout"
      >
        <LogOut size={20} />
      </Button>
    </AnimateIcon>
  );
}
