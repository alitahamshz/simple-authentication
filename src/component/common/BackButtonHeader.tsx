import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";


export default async function Header({ title }: { title: string }) {

    return (
        <>
            <div
                id="StickyHeader"
                className="fixed top-2 z-20 shadow-xl max-w-[480px] w-[90%] flex flex-row justify-between items-center m-3 bg-white p-4 rounded-xl"
            >
                <div className="flex-1">
                    <Link href="/profile">
                        <ChevronRight
                            size={30}
                            className="bg-gray-200 p-1 rounded-md relative z-10"
                        />
                    </Link>
                </div>
                <div className="flex-1 text-center">
                    <span className="font-bold text-lg" >{title}</span>
                </div>
                <div className="flex-1 gap-1 ">
                    {/* <ThemeSwitcher /> */}
                    <Link href="#">

                    </Link>
                </div>
            </div>
        </>
    );
}
