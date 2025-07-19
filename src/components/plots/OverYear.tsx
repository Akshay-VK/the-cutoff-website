export function OverYearFilter() {
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="w-full px-2 py-1.5">
                <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-1">
                    {"year filter"}
                </div>
            </div>
        </div>
    );
}

export function OverYear() {
    return (
        <p className=" w-full h-full grid place-content-center text-5xl font-bold">{"Nothing here  (￣y▽,￣)╭"}</p>
    );
}