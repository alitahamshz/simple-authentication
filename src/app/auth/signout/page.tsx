// app/signout/page.tsx
"use client";

import Image from "next/image";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
    const router = useRouter();
    useEffect(() => {
        const doSignOut = async () => {
            setTimeout(async () => {
                await signOut({
                    redirect: false,
                });
                router.replace("/home"); // بعد از signout برو به /home
                router.refresh()
            }, 2000);

        };

        doSignOut();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen px-[100px] text-center">
            <Image alt="signout" width={200} height={200} src='/img/logout.png'/>
        <p className="font-bold text-lg">در حال خروج...</p>
        <p className="font-bold text-lg">برای استفاده از تمامی امکانات مجددا وارد شوید</p>
        </div>
    );
}