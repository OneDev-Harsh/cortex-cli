"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);

      await authClient.signIn.social({
        provider: "github",
        callbackURL: "http://localhost:3000",
      });

    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">

      {/* LEFT SIDE (Branding / Visual) */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-12 border-r border-zinc-800">

        <Image
          src="/login.svg"
          alt="Login"
          width={300}
          height={300}
          className="opacity-90"
        />

        <h1 className="text-3xl font-semibold mt-8 tracking-tight">
          Cortex CLI
        </h1>

        <p className="text-zinc-400 mt-3 text-center max-w-sm">
          Your AI-powered developer terminal.
          Authenticate to connect your CLI with your account.
        </p>
      </div>

      {/* RIGHT SIDE (Login) */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-sm space-y-8">

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Sign in
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Continue with GitHub to proceed
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-5 
            bg-zinc-800 text-white hover:bg-zinc-700 
            border border-zinc-700 hover:border-zinc-600
            transition-all rounded-lg font-medium
            hover:scale-[1.01] hover:shadow-md hover:shadow-black/20"
          >
            <Image src="/github.svg" alt="GitHub" width={25} height={25} />
            {isLoading ? "Redirecting..." : "Continue with GitHub"}
          </Button>

          {/* Footer */}
          <p className="text-xs text-zinc-500">
            Secure authentication via GitHub OAuth
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;