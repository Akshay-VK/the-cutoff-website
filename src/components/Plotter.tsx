'use client';

import { Button } from "~/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Checkbox } from "~/components/ui/checkbox"
import { useState } from "react";
import { OverYear, OverYearFilter } from "./plots/OverYear";
import { OverCollege, OverCollegeFilter } from "./plots/OverCollege";
import { OverRound, OverRoundFilter } from "./plots/OverRound";
import { ScrollArea } from "./ui/scroll-area";

export default function Plotter(
    {
        collegeList
    }: {
        collegeList:{
            type: "IIT" | "NIT" | "IIIT" | "GFTI";
            colleges: {
                name: string;
            }[];
        }[]
    }
) {

    let [colleges,setColleges] = useState<string[]>([]);

    function CollegeSelector(){
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row">
                <p className="basis-2/3 grid place-content-center">
                    Colleges
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="basis-1/3 rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 text-textLight-100 dark:text-text-100 cursor-pointer">
                            Open
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28 bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100 cursor-pointer" align="start">
                        <DropdownMenuLabel className="text-textLight-100 dark:text-text-100">Colleges</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {collegeList.map((collegeGroup) => {
                                return (
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className="cursor-pointer">
                                            {collegeGroup.type}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                                                <ScrollArea className="max-h-60 h-60 max-w-72 w-72">
                                                    {collegeGroup.colleges.map((college) => {
                                                        return (
                                                            <DropdownMenuItem className="text-sm cursor-pointer flex flex-row">
                                                                <Checkbox
                                                                checked={colleges.includes(college.name)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setColleges([...colleges, college.name]);
                                                                    } else {
                                                                        setColleges(colleges.filter(c => c !== college.name));
                                                                    }
                                                                }}/>
                                                                {college.name}
                                                            </DropdownMenuItem>
                                                        );
                                                    })}
                                                </ScrollArea>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                );
                            })}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }

    type PlotType = "overYear" | "overRound" | "overCollege";

    const [plotType, setPlotType] = useState<PlotType>("overYear");

    function PlotSelector() {
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-1">
                <p className="basis-2/3 grid place-content-center">
                    Plot
                </p>
                <Select value={plotType} onValueChange={(v)=>{setPlotType(v as PlotType);}}>
                    <SelectTrigger className="basis-1/3 text-xs rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 cursor-pointer">
                        <SelectValue placeholder="plotType" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                        <SelectItem key={"overYear"} value={"overYear"} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Cutoff vs Year</SelectItem>
                        <SelectItem key={"overRound"} value={"overRound"} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Cutoff vs Round</SelectItem>
                        <SelectItem key={"overCollege"} value={"overCollege"} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">Cutoff vs College</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        );
    }
    
    return (
        <div className="bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 divide-x divide-highlightLight-100 dark:divide-highlight-100 grow max-w-5/6 my-2 mr-2 rounded-2xl flex flex-row">
            <div className="w-60 flex-none rounded-l-2xl font-medium divide-y divide-highlightLight-100 dark:divide-highlight-100 flex flex-col gap-2">
                <div className="grid place-content-center p-3 font-semibold text-lg">Plotter</div>
                <div className="flex flex-col gap-2 mt-4 mb-2 pb-4">
                    <div className="w-full px-2 py-1.5"><CollegeSelector/></div>
                    <div className="w-full px-2 py-1.5"><PlotSelector/></div>
                </div>
                {plotType=="overYear" && <OverYearFilter/>}
                {plotType=="overRound" && <OverRoundFilter/>}
                {plotType=="overCollege" && <OverCollegeFilter/>}
            </div>
            <div className="grow m-2 max-w-4/5">
                {plotType=="overYear" && <OverYear/>}
                {plotType=="overRound" && <OverRound/>}
                {plotType=="overCollege" && <OverCollege/>}
            </div>
        </div>
    );
}