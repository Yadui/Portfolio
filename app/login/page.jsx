"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/blog/create");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-zinc-900 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/50 border-white/10 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="bg-accent text-primary hover:bg-accent/90">Login</Button>
      </form>
    </div>
  );
}
