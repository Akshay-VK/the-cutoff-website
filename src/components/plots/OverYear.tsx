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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";


import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import type { CutoffData, YearPlotData } from "~/lib/utils";
import { RefreshCw } from "lucide-react";

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
        yearPlotFunction,
        updater
    }: {
        courses: string[];
        colleges: string[];
        yearPlotFunction: (data: YearPlotData) => Promise<CutoffData[]>;
        updater: () => YearPlotData;
    }
) {

    let [data, setData] = useState<YearPlotData>({
        courses: courses,
        colleges: colleges,
    });

    let [femaleOnly, setFemaleOnly] = useState(false);
    let round = 1;
    let seatType = "open";
    let plotOpening = true;

    async function updateData(){

        setData(updater());

        console.log(data);
        console.log(femaleOnly, round, seatType, plotOpening);
        // let res = await yearPlotFunction(updater());
        // console.log("Fetched data:", res);
    }

    return (
        <Card className="w-full bg-primaryLight-200 dark:bg-primary-200 text-textLight-100 dark:text-text-100 border border-highlightLight-100 dark:border-highlight-100">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Cutoff over the years</CardTitle>
                <CardDescription>Variation of cutoff of the selected courses from selected colleges.</CardDescription>
                <CardAction>
                    <Button
                    className="aspect-square bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 rounded-3xl text-textLight-200 dark:text-text-200 hover:bg-primaryLight-100 dark:hover:bg-primary-100 flex items-center justify-center cursor-pointer"
                    onClick={async ()=>{await updateData();}}>
                        <RefreshCw/>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="w-full py-2 flex flex-row gap-2">
                    <Select defaultValue={round.toString()} onValueChange={(v)=>{round=parseInt(v);}}>
                        <SelectTrigger className="rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 cursor-pointer">
                            <SelectValue placeholder = "Select a round."/>
                        </SelectTrigger>
                        <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                            <SelectItem value="1" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Round 1</SelectItem>
                            <SelectItem value="2" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Round 2</SelectItem>
                            <SelectItem value="3" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Round 3</SelectItem>
                            <SelectItem value="4" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Round 4</SelectItem>
                            <SelectItem value="5" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Round 5</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue={seatType} onValueChange={(v)=>{seatType=v;}}>
                        <SelectTrigger className="rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 cursor-pointer">
                            <SelectValue placeholder = "Select seat type."/>
                        </SelectTrigger>
                        <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                            <SelectItem value="open" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Open</SelectItem>
                            <SelectItem value="open_pwd" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Open (PwD)</SelectItem>
                            <SelectItem value="ews" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">EWS</SelectItem>
                            <SelectItem value="ews_pwd" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">EWS (PwD)</SelectItem>
                            <SelectItem value="obc" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">OBC</SelectItem>
                            <SelectItem value="obc_pwd" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">OBC (PwD)</SelectItem>
                            <SelectItem value="sc" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">SC</SelectItem>
                            <SelectItem value="sc_pwd" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">SC (PwD)</SelectItem>
                            <SelectItem value="st" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">ST</SelectItem>
                            <SelectItem value="st_pwd" className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">ST (PwD)</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl border border-highlightLight-100 dark:border-highlight-100 py-2 px-4 flex flex-row gap-3">
                        <p className="grid place-content-center text-xs">
                            Female only
                        </p>
                        <div className="grid place-content-center">
                            <Switch  checked={femaleOnly} onCheckedChange={(checked)=>{
                                setFemaleOnly(checked);
                            }} className="data-[state=checked]:bg-blue-500"/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}