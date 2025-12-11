"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/blog");
      router.refresh();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="absolute top-6 left-6">
         <Link href="/">
           <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white gap-2">
             ← Home
           </Button>
         </Link>
      </div>

      <div className="container mx-auto flex items-center justify-center min-h-screen pt-20">
        <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/60 text-sm">Username</label>
              <Input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-white/60 text-sm">Password</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full bg-accent text-primary font-bold hover:bg-accent/90">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
