"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {

  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  if (!data?.session && !data?.user) {
    router.push("/sign-in");
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Profile Card */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">

          {/* Avatar */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img
                src={data?.user?.image || "/vercel.svg"}
                alt={data?.user?.name || "User"}
                className="h-24 w-24 rounded-full object-cover border"
              />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                {data?.user?.name || "User"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back 👋
              </p>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Email</p>
          <p className="text-sm font-medium break-all">
            {data?.user?.email}
          </p>
        </div>

        {/* Logout */}
        <Button
          className="w-full rounded-xl text-sm font-medium"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onError: (ctx) => console.log(ctx),
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
        >
          Sign Out
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            Session Active
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

      </div>
    </div>
  );
}