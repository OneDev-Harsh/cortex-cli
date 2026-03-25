"use client"

import LoginForm from '@/components/login-form'
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Page = () => {

    const { data, isPending } = authClient.useSession();
    const router = useRouter();
    
    if (data?.session && data?.user) {
        router.push("/");
    }

    if (isPending) {
        return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Spinner />
        </div>
        );
    }

  return (
    <>
        <LoginForm />
    </>
  )
}

export default Page