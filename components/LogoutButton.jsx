"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outline" 
      className="text-white border-white/20 hover:bg-white/10 hover:text-white"
    >
      Logout
    </Button>
  );
}
