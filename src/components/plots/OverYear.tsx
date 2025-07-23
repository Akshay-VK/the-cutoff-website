import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import type { CutoffData, YearPlotData } from "~/lib/utils";

export function OverYearFilter(
    {
        courseList,
        courses,
        setCourses
    }: {
        courseList: {
            name: string;
        }[],
        courses: string[];
        setCourses: (courses: string[]) => void;
    }
) {

    // let [courses,setCourses] = useState<string[]>([]);
    let [courseSelector, setCourseSelector] = useState(false);

    return (
        <div className="flex flex-col gap-2x grow">
            {/* filter block */}
            <div className="w-full px-2 py-1.5">
                <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-1">
                    {/* filter content */}
                    <div className="grid w-16 text-sm place-content-center bg-blue-500 hover:bg-blue-400 border border-blue-300 dark:border-blue-500 rounded-3xl">{courses.length}</div>
                    <p className="basis-2/3 grid place-content-center">
                        Courses
                    </p>
                    <Button
                        className="basis-1/3 rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 hover:bg-primaryLight-100 dark:hover:bg-primary-100 text-textLight-200 dark:text-text-200 cursor-pointer"
                        onClick={()=>{setCourseSelector(true);}}>
                        Open
                    </Button>
                    <CommandDialog
                        open={courseSelector}
                        onOpenChange={setCourseSelector}
                        className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                        <CommandInput placeholder="Type a course name or search..."/>
                        <CommandList>
                            <CommandEmpty>No courses found.</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="h-72 py-1 rounded rounded-2xl">
                                    {courseList.map((course) => {
                                        return (
                                            <CommandItem
                                                key={course.name}
                                                onSelect={(_e) => {
                                                    // e.preventDefault();
                                                    if (courses.includes(course.name)) {
                                                        setCourses(courses.filter(c => c !== course.name));
                                                    } else {
                                                        setCourses([...courses, course.name]);
                                                    }
                                                }}
                                                className="cursor-pointer hover:bg-primaryLight-300 dark:hover:bg-primary-300 rounded-2xl hover:text-textLight-100 dark:hover:text-text-100 flex flex-row gap-2">
                                                <Checkbox checked={courses.includes(course.name)} onSelect={(e)=>{e.preventDefault();}}/>
                                                {course.name}
                                            </CommandItem>
                                        );
                                    })}
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </div>
            </div>
        </div>
    );
}

export function OverYear(
    {
        courses,
        colleges,
        yearPlotFunction
    }: {
        courses: string[];
        colleges: string[];
        yearPlotFunction: (data: YearPlotData) => Promise<CutoffData[]>;
    }
) {

    let [data, setData] = useState<YearPlotData>({
        courses: [],
        colleges: [],
    });

    async function updateData(){

        setData({courses, colleges});

        console.log(data);
        let res = await yearPlotFunction(data);
        console.log("Fetched data:", res);
    }

    return (
        <Button
         className="bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 rounded-2xl text-textLight-200 dark:text-text-200 hover:bg-primaryLight-100 dark:hover:bg-primary-100 flex items-center justify-center cursor-pointer"
         onClick={async ()=>{await updateData();}}>
            Log
        </Button>
    );
}