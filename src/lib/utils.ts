import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface Query{
  year: number,
  round: number,
  iit: boolean,
  female: boolean,
  sortBy: string,
  increasing: boolean,
  from:number,
  to:number,
}

export interface CutoffData {
  name: string,
  college: string,
  state: string,
  gender: "Gender-Neutral" | "Female-only (including Supernumerary)",
  opening: number,
  closing: number,
  type: "IIT" | "NIT" | "IIIT" | "GFTI",
}

export enum SortBy {
  opening = "opening",
  closing = "closing",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const titleCase = (str: string) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
