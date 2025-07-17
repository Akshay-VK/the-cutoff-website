import { Skeleton } from "~/components/ui/skeleton"

export default function SidebarSkeleton(){
    return (
        <div className="shrink w-60 h-[calc(100vh-20px)] m-2 flex flex-col gap-2 relative">
            <div className="font-bold text-xl text-center h-12 grid place-content-center">
                The Cutoff Website
            </div>
            <div className="h-8"></div>
            <Skeleton className="h-12 hover:bg-primaryLight-300 darkhover:bg-primary-300 cursor-pointer rounded-4xl grid place-content-center transition-colors bg-primaryLight-100 dark:bg-primary-100" />
        </div>
    )
}