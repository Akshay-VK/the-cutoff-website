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
import { titleCase } from "~/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Filters() {

    interface Query{
        year: number,
        round: 1 | 2 | 3 | 4 | 5 | 6,
        increasing: boolean,
        from:number,
        to:number,
    }

    enum SortBy {
        opening = "opening",
        closing = "closing",
    }

    let years = [2025, 2024, 2023];
    let rounds = [1, 2, 3, 4, 5, 6];

    let numericalFields = [
        SortBy.opening,
        SortBy.closing,
    ];

    let [dataQuery,setDataQuery] = useState({
        year: 2025,
        round: 1,
        sortBy: SortBy.closing,
        increasing: true,
        from: 1,
        to: 1000,
    })

    function YearFilter() {
        return (
            <div className="bg-primaryLight-300 rounded-3xl py-2 px-4 flex flex-row">
                <p className="basis-2/3 grid place-content-center">
                    Year
                </p>
                <Select value={dataQuery.year.toString()} onValueChange={(value) => {
                    console.log(value);
                    setDataQuery((prev) => ({
                        ...prev,
                        year: parseInt(value)
                    }));
                }}>
                    <SelectTrigger className="basis-1/3 rounded-2xl border border-highlightLight-100 bg-primaryLight-200 cursor-pointer">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 rounded-3xl text-textLight-200 border border-highlightLight-100">
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()} className="bg-primaryLight-200 rounded-2xl hover:bg-primaryLight-300 text-textLight-200 cursor-pointer">{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    function RoundFilter() {
        return (
            <div className="bg-primaryLight-300 rounded-3xl py-2 px-4 flex flex-row">
                <p className="basis-2/3 grid place-content-center">
                    Round
                </p>
                <Select value={dataQuery.round.toString()} onValueChange={(value) => {
                    console.log(value);
                    setDataQuery((prev) => ({
                        ...prev,
                        round: parseInt(value)
                    }));
                }}>
                    <SelectTrigger className="basis-1/3 rounded-2xl border border-highlightLight-100 bg-primaryLight-200 cursor-pointer">
                        <SelectValue placeholder="Round" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 rounded-3xl text-textLight-200 border border-highlightLight-100">
                        {rounds.map((round) => (
                            <SelectItem key={round} value={round.toString()} className="bg-primaryLight-200 rounded-2xl hover:bg-primaryLight-300 text-textLight-200 cursor-pointer">{round}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        );
    }

    function SortFilter(){
        return (
            <div className="bg-primaryLight-300 rounded-3xl py-2 px-4 flex flex-row gap-3">
                <div className="basis-2/6 grid place-content-center">Sort</div>
                <Select value={dataQuery.sortBy} onValueChange={(value) => {
                    console.log(value);
                    setDataQuery((prev) => ({
                        ...prev,
                        sortBy: SortBy[value as keyof typeof SortBy]
                    }));
                }}>
                    <SelectTrigger className="basis-2/6 rounded-2xl border border-highlightLight-100 bg-primaryLight-200 text-xs cursor-pointer">
                        <SelectValue placeholder="Round" />
                    </SelectTrigger>
                    <SelectContent className="bg-primaryLight-200 rounded-3xl text-textLight-200 border border-highlightLight-100">
                        {numericalFields.map((field) => (
                            <SelectItem key={field} value={field} className="bg-primaryLight-200 rounded-2xl hover:bg-primaryLight-300 text-textLight-200 cursor-pointer">{titleCase(field.replace('_',' '))}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button className="basis-2/6 grid place-content-center bg-blue-500 hover:bg-blue-400 border border-blue-300 rounded-3xl cursor-pointer" onClick={()=>{
                    setDataQuery((prev) => ({
                        ...prev,
                        increasing: !prev.increasing
                    }));
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
            <div className="bg-primaryLight-300 rounded-3xl py-2 px-4 grid grid-cols-2 gap-2">
                <div className="grid place-content-center">
                    From
                </div>
                <div className="grid place-content-center">
                    <Input type="number" value={dataQuery.from} onChange={(v)=>{
                        console.log(dataQuery.from);
                        setDataQuery((prev) => ({
                            ...prev,
                            from: parseInt(v.target.value)
                        }));
                    }} className="rounded-2xl border border-highlightLight-100 bg-primaryLight-200"/>
                </div>
                <div className="grid place-content-center">
                    To
                </div>
                <div className="grid place-content-center">
                    <Input type="number" value={dataQuery.to} onChange={(v)=>{
                        setDataQuery((prev) => ({
                            ...prev,
                            to: parseInt(v.target.value)
                        }));
                    }} className="rounded-2xl border border-highlightLight-100 bg-primaryLight-200"/>
                </div>
            </div>
        );
    }

    function setFilters() {
        return (
            <Button className="bg-blue-500 hover:bg-blue-400 border border-blue-300 p-4 rounded-3xl cursor-pointer w-full" onClick={()=>{
                console.log(dataQuery);
                // Here you would typically send the dataQuery to your API or state management solution
            }}>Filter</Button>
        );
    }

    let filters = [
        YearFilter,
        RoundFilter,
        SortFilter,
        RangeFilter,
        setFilters
    ];


    return (
        <div>
            {filters.map((v,i) => {
                return (
                    <div key={i} className="w-full p-2">{v()}</div>
                );
            })}
        </div>
    );
}