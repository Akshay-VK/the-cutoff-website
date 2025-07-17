import Plotter from "~/components/Plotter";
import Sidebar from "~/components/Sidebar";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { collegeTable, collegeTypeEnum, cutoffTable } from "~/server/db/schema";

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
    ]
  );
  console.log("Colleges grouped by type:", collegeGrouped);

  return (
    <main className="w-full min-w-screen min-h-screen bg-primaryLight-100 text-textLight-100 dark:bg-primary-100 dark:text-text-100 flex flex-row">
      <Sidebar/>
      <Plotter/>
    </main>
  );
}
