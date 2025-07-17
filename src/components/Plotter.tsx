'use client';

export default function Filters() {

    console.log('hello')

    return (
        <div className="bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 divide-x divide-highlightLight-100 dark:divide-highlight-100 grow max-w-5/6 my-2 mr-2 rounded-2xl flex flex-row">
            <div className="w-60 flex-none rounded-l-2xl font-medium divide-y divide-highlightLight-100 dark:divide-highlight-100 flex flex-col gap-2">
                <div className="grid place-content-center p-3 font-semibold text-lg">Plotter</div>
                <div className="grow flex flex-col gap-2 mt-4">
                    <div  className="w-full px-2 py-1.5">{"Test"}</div>
                </div>
            </div>
            <div className="grow m-2 max-w-4/5">
                <p className=" w-full h-full grid place-content-center text-5xl font-bold">{"Nothing here  (～￣3￣)～"}</p>
            </div>
        </div>
    );
}