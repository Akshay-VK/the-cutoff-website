'use client'

import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function Sidebar(){

    let paths = [
        "/cutoff-viewer",
        "/cutoff-plotter"
    ];

    let path = usePathname();

    const titleCase = (str: string) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="shrink w-60 m-2 flex flex-col gap-2">
            <div className="font-bold text-xl text-center h-12 grid place-content-center">
                The Cutoff Website
            </div>
            <div className="h-8"></div>
            {paths.map((v)=>{
                let value=v.replace("-"," ");
                value = titleCase(value.split('/')[1] ?? "");
                return (
                    <div className={clsx("h-12 hover:bg-primary-300 cursor-pointer rounded-4xl grid place-content-center transition-colors",v==path ? "bg-primary-200" : "bg-primary-100")} key={value}>
                        {value}
                    </div>
                );
            })}
        </div>
    )
}