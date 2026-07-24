"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SidebarItem({href, title, icon}:{href: string, title: string, icon: React.ReactNode}){

    const router  = useRouter();
    const pathname = usePathname();
    const isActive = pathname === href;


    return (
        <div className={`${isActive ? 'font-bold text-zinc-200' : 'text-zinc-600' } flex cursor-pointer p-3 pl-10`} onClick={()=>router.push(href)}>
            <div className="pr-3">
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )

}