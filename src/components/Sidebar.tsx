'use client'

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { titleCase } from "~/lib/utils";
import { ModeToggle } from "./theme-toggle";

export default function Sidebar(){

    const paths = [
        "/cutoff-viewer",
        "/cutoff-plotter"
    ];

    const path = usePathname();


    return (
        <div className="shrink w-60 h-[calc(100vh-20px)] m-2 flex flex-col gap-2 relative">
            <div className="font-bold text-xl text-center h-12 grid place-content-center">
                The Cutoff Website
            </div>
            <div className="h-8"></div>
            {paths.map((v)=>{
                let value=v.replace("-"," ");
                value = titleCase(value.split('/')[1] ?? "");
                return (
                    <div className={clsx("h-12 hover:bg-primaryLight-300 darkhover:bg-primary-300 cursor-pointer rounded-4xl grid place-content-center transition-colors",v==path ? "bg-primaryLight-200 dark:bg-primary-200" : "bg-primaryLight-100 dark:bg-primary-100")} key={value}>
                        {value}
                    </div>
                );
            })}
            <div className="absolute w-fit h-fit bottom-0 right-0">
                <ModeToggle/>
            </div>
        </div>
    )
}