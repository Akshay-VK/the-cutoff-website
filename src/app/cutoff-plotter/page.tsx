import Plotter from "~/components/Plotter";
import Sidebar from "~/components/Sidebar";
import { db } from "~/server/db";
import { asc, and, eq, inArray } from "drizzle-orm";
import { collegeTable, collegeTypeEnum, cutoffTable } from "~/server/db/schema";
import type { CutoffData, YearPlotData } from "~/lib/utils";

export default async function CutoffPlotter() {

  const collegeTypes = collegeTypeEnum.enumValues;

  const [collegeGrouped,courses] = await Promise.all(
    [
      await Promise.all(
        [
          ...collegeTypes.map(async (type) => {
            const colleges = await db.select({name: collegeTable.name}).from(collegeTable).where(eq(collegeTable.type, type)).orderBy(collegeTable.name);
            return { type, colleges };
          })
        ]
      ),
      await db.selectDistinct(
        {name: cutoffTable.courseName})
        .from(cutoffTable)
        .orderBy(cutoffTable.courseName)
    ]
  );
  // console.log("Colleges grouped by type:", collegeGrouped);
  console.log("Courses available:", courses.map(c => c.name));

  async function getYearPlotData(data: YearPlotData, round: number): Promise<CutoffData[]> {
    'use server';

    console.log("Fetching year plot data for:", data);
    if (data.courses.length === 0 || data.colleges.length === 0) {
      return [];
    }

    let res: CutoffData[] = await db.select({
      name: cutoffTable.courseName,
      college: collegeTable.name,
      state: collegeTable.state,
      year: cutoffTable.year,
      round: cutoffTable.round,
      gender: cutoffTable.gender,
      seat_type: cutoffTable.seatType,
      quota: cutoffTable.rankType,
      type: collegeTable.type,
      opening: cutoffTable.openingRank,
      closing: cutoffTable.closingRank,
    }).from(cutoffTable).where(
      and(
        eq(cutoffTable.round, round),
        inArray(cutoffTable.courseName, data.courses),
        inArray(collegeTable.name, data.colleges)
      )
    )
    .innerJoin(collegeTable, eq(cutoffTable.collegeId, collegeTable.id))
    // .limit(200)
    .orderBy(
      asc(cutoffTable.openingRank)
    );

    return res;
  }

  return (
    <main className="w-full min-w-screen min-h-screen bg-primaryLight-100 text-textLight-100 dark:bg-primary-100 dark:text-text-100 flex flex-row">
      <Sidebar/>
      <Plotter collegeList={collegeGrouped} courses={courses} yearPlotFunction={getYearPlotData}/>
    </main>
  );
}
