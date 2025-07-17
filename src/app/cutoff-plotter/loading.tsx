'use client';

import SidebarSkeleton from "~/components/SidebarSkeleton";

export default function Loading() {

    console.log('loading')

    return (
        <main className="w-full min-w-screen min-h-screen bg-primaryLight-100 text-textLight-100 dark:bg-primary-100 dark:text-text-100 flex flex-row">
        <SidebarSkeleton/>
        <div className="bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 divide-x divide-highlightLight-100 dark:divide-highlight-100 grow max-w-5/6 my-2 mr-2 rounded-2xl flex flex-row">
                <div className="w-60 flex-none rounded-l-2xl font-medium divide-y divide-highlightLight-100 dark:divide-highlight-100 flex flex-col gap-2">
                    <div className="grid place-content-center p-3 font-semibold text-lg">Plotter</div>
                    <div className="grow flex flex-col gap-2 mt-4">
                        <div  className="w-full px-2 py-1.5">{"Loading"}</div>
                    </div>
                </div>
                <div className="grow m-2 max-w-4/5">
                    <p className=" w-full h-full grid place-content-center text-5xl font-bold">{"Loading... (￣﹃￣)"}</p>
                </div>
            </div>
        </main>
    );
}
