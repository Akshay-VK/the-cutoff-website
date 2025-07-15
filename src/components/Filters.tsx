'use client';

import { MoveDownRight, MoveUpRight } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { titleCase, type Query, type CutoffData } from "~/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

export default function Filters(
    {
        PdataQuery,
        getDataAction
    }:
    {
        PdataQuery: Query,
        getDataAction: (query: Query) => CutoffData[] | Promise<CutoffData[]>
    }
){

    enum SortBy {
        opening = "opening",
        closing = "closing",
    }

    const [dataQuery, setDataQuery] = useState<Query>(PdataQuery);

    const years = [2025, 2024, 2023];
    const rounds = [1, 2, 3, 4, 5, 6];

    const numericalFields = [
        SortBy.opening,
        SortBy.closing,
    ];

    let [res,setRes] = useState<CutoffData[]>([]);

    function YearFilter() {
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row">
                <p className="basis-2/3 grid place-content-center">
                    Year
                </p>
                <Select value={dataQuery.year.toString()} onValueChange={(value) => {
                    console.log(value);
                    setDataQuery((prev) => ({ ...prev, year: parseInt(value) }));
                }}>
                    <SelectTrigger className="basis-1/3 rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 cursor-pointer">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    function RoundFilter() {
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row">
                <p className="basis-2/3 grid place-content-center">
                    Round
                </p>
                <Select value={dataQuery.round.toString()} onValueChange={(value) => {
                    console.log(value);
                    let v = parseInt(value);
                    setDataQuery((prev) => ({ ...prev, round: v > 6 ? 6 : v < 1 ? 1 : v }));
                }}>
                    <SelectTrigger className="basis-1/3 rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 cursor-pointer">
                        <SelectValue placeholder="Round" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                        {rounds.map((round) => (
                            <SelectItem key={round} value={round.toString()} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">{round}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    function CollegeFilter(){
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-3">
                <p className="basis-2/3 grid place-content-center">
                    IIT
                </p>
                <div className="basis-1/3 grid place-content-center">
                    <Switch checked={dataQuery.iit} onCheckedChange={(checked)=>{
                        setDataQuery((prev) => ({ ...prev, iit: checked }));
                    }} className="data-[state=checked]:bg-blue-500"/>
                </div>
            </div>
        );
    }

    function GenderFilter(){
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-3">
                <p className="basis-2/3 grid place-content-center">
                    Female only
                </p>
                <div className="basis-1/3 grid place-content-center">
                    <Switch checked={dataQuery.female} onCheckedChange={(checked)=>{
                        setDataQuery((prev) => ({ ...prev, female: checked }));
                    }} className="data-[state=checked]:bg-blue-500"/>
                </div>
            </div>
        );
    }

    function SortFilter(){
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 flex flex-row gap-3">
                <div className="basis-2/6 grid place-content-center">Sort</div>
                <Select value={dataQuery.sortBy} onValueChange={(value) => {
                    console.log(value);
                    setDataQuery({ ...dataQuery, sortBy: value as keyof typeof SortBy});
                }}>
                    <SelectTrigger className="basis-2/6 rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200 text-xs cursor-pointer">
                        <SelectValue placeholder="Round" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 dark:bg-primary-200 rounded-3xl text-textLight-200 dark:text-text-200 border border-highlightLight-100 dark:border-highlight-100">
                        {numericalFields.map((field) => (
                            <SelectItem key={field} value={field} className="bg-primaryLight-200 dark:bg-primary-200 rounded-2xl hover:bg-primaryLight-300 dark:hover:bg-primary-300 text-textLight-200 dark:text-text-200 cursor-pointer">{titleCase(field.replace('_',' '))}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button className="basis-2/6 grid place-content-center bg-blue-500 hover:bg-blue-400 border border-blue-300 dark:border-blue-500 rounded-3xl cursor-pointer" onClick={()=>{
                    setDataQuery((prev) => ({ ...prev, increasing: !prev.increasing }));
                    console.log(dataQuery.increasing);
                }}>
                    {(dataQuery.increasing) ?
                        (
                            <MoveUpRight color="var(--color-primaryLight-300)" size={18} />
                        ):
                        (
                            <MoveDownRight color="var(--color-primaryLight-300)" size={18} />
                        )
                    }
                </button>
            </div>
        );
    }

    function RangeFilter() {
        return (
            <div className="bg-primaryLight-300 dark:bg-primary-300 rounded-3xl py-2 px-4 grid grid-cols-2 gap-2">
                <div className="grid place-content-center">
                    From
                </div>
                <div className="grid place-content-center">
                    <Input type="number" value={dataQuery.from} onChange={(v)=>{
                        console.log(dataQuery.from);
                        setDataQuery((prev) => ({ ...prev, from: parseInt(v.target.value) }));
                    }} className="rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200"/>
                </div>
                <div className="grid place-content-center">
                    To
                </div>
                <div className="grid place-content-center">
                    <Input type="number" value={dataQuery.to} onChange={(v)=>{
                        setDataQuery((prev) => ({ ...prev, to: parseInt(v.target.value) }));
                    }} className="rounded-2xl border border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-200 dark:bg-primary-200"/>
                </div>
            </div>
        );
    }

    function setFilters() {
        return (
            <Button className="bg-blue-500 hover:bg-blue-400 border border-blue-300 dark:border-blue-500 text-text-100 p-4 rounded-3xl cursor-pointer w-full" onClick={async ()=>{
                // console.log(dataQuery);
                setRes(await getDataAction(dataQuery));
                console.log(res);
            }}>Filter</Button>
        );
    }

    const filters = [
        YearFilter,
        RoundFilter,
        GenderFilter,
        CollegeFilter,
        SortFilter,
        RangeFilter,
        setFilters
    ];


    return (
        <div className="bg-primaryLight-200 dark:bg-primary-200 border border-highlightLight-100 dark:border-highlight-100 divide-x divide-highlightLight-100 dark:divide-highlight-100 grow max-w-5/6 my-2 mr-2 rounded-2xl flex flex-row">
            <div className="w-60 flex-none rounded-l-2xl font-medium divide-y divide-highlightLight-100 dark:divide-highlight-100 flex flex-col gap-2">
                <div className="grid place-content-center p-3 font-semibold text-lg">Filters</div>
                <div className="grow flex flex-col gap-2 mt-4">
                        {filters.map((v,i) => {
                            return (
                                <div key={i} className="w-full px-2 py-1.5">{v()}</div>
                            );
                        })}
                </div>
            </div>
            <div className="grow m-2 max-w-4/5">
                {(res.length == 0) ?
                    (<p className=" w-full h-full grid place-content-center text-6xl font-bold">Content</p>)
                :
                    (
                        <ScrollArea className="min-h-[calc(100vh-40px)] h-[calc(100vh-40px)] scroll-pb-6 w-full rounded-2xl">
                            <div className="text-center text-textLight-100 dark:text-text-100 flex flex-col gap-2">
                                {res.map((data, index) => (
                                    <div key={index} className="border p-2 rounded-2xl border-highlightLight-100 dark:border-highlight-100 bg-primaryLight-300 dark:bg-primary-300 flex flex-col gap-2">
                                        <p className="font-semibold text-lg text-left max-w-4/5 w-fit">{data.name}</p>
                                        <p className="font-medium text-left w-fit">{data.college}<b className="text-textLight-200 dark:text-text-200">{"  "}{data.state}</b></p>
                                        <p className="text-left flex flex-row gap-1 w-fit"><Badge>{data.seat_type.toUpperCase()}</Badge><Badge variant="outline">{data.gender}</Badge><Badge variant="outline">{data.quota}</Badge></p>
                                        <p className="text-left font-semibold bg-primaryLight-200 dark:bg-primary-200 w-fit px-3 py-1 rounded-2xl border border-highlightLight-100 dark:border-highlight-100">{data.opening} - {data.closing}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )
                }
            </div>
        </div>
    );
}