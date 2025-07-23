import { and, asc, between, desc, eq, not } from "drizzle-orm";
import Filters from "~/components/Filters";
import Sidebar from "~/components/Sidebar";
import { SortBy, type CutoffData, type Query } from "~/lib/utils";
import { db } from "~/server/db";
import { collegeTable, cutoffTable } from "~/server/db/schema";

export default async function CutoffViewer() {

  // const karnatakaColleges = await db.select().from(collegeTable).where(
  //   eq(collegeTable.state,"Karnataka")
  // );

  let dataQuery: Query = {
      year: 2025,
      round: 1,
      iit: false,
      female: false,
      sortBy: SortBy.closing,
      increasing: true,
      from: 1,
      to: 1000,
  } as Query;


  async function getData(query: Query): Promise<CutoffData[]> {
    'use server';
    console.log("Fetching data with query:", query);
    if (query.year < 2024 || query.year > 2025) {
      throw new Error("Year must be between 2024 and 2025");
    }
    let consideredField = query.sortBy== SortBy.opening ? cutoffTable.openingRank: cutoffTable.closingRank;

    let res: CutoffData[] =  await db.select({
      name: cutoffTable.courseName,
      college: collegeTable.name,
      state: collegeTable.state,
      year: cutoffTable.year,
      gender: cutoffTable.gender,
      seat_type: cutoffTable.seatType,
      quota: cutoffTable.rankType,
      type: collegeTable.type,
      opening: cutoffTable.openingRank,
      closing: cutoffTable.closingRank,
    }).from(cutoffTable).where(
      and
      (
        eq(cutoffTable.year, query.year),
        eq(cutoffTable.round, query.round),
        eq(cutoffTable.seatType, "open"),
        (query.iit ? eq(collegeTable.type, "IIT") : not(eq(collegeTable.type, "IIT"))),
        (query.female ? eq(cutoffTable.gender , "Female-only (including Supernumerary)") : not(eq(cutoffTable.gender , "Female-only (including Supernumerary)"))),
        between(consideredField , query.from, query.to),
      )  
    )
    .innerJoin(collegeTable, eq(cutoffTable.collegeId, collegeTable.id))
    .limit(200).orderBy(
      query.increasing ? asc(consideredField) : desc(consideredField)
    );

    // console.log(res);
    return res;
  }

  return (
    <main className="w-full min-w-screen min-h-screen bg-primaryLight-100 text-textLight-100 dark:bg-primary-100 dark:text-text-100 flex flex-row">
      <Sidebar/>
      <Filters PdataQuery={dataQuery} getDataAction={getData}/>
    </main>
  );
}
