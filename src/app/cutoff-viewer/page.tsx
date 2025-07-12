import { eq } from "drizzle-orm";
import Filters from "~/components/Filters";
import Sidebar from "~/components/Sidebar";
import { db } from "~/server/db";
import { collegeTable } from "~/server/db/schema";

export default async function CutoffViewer() {

  // const karnatakaColleges = await db.select().from(collegeTable).where(
  //   eq(collegeTable.state,"Karnataka")
  // );


  return (
    <main className="w-full min-w-screen min-h-screen bg-primaryLight-100 text-textLight-100 flex flex-row">
      <Sidebar/>
      <div className="bg-primaryLight-200 border border-highlightLight-100 divide-x divide-highlightLight-100 grow my-2 mr-2 rounded-2xl flex flex-row">
        <div className="w-60 rounded-l-2xl font-medium divide-y divide-highlightLight-100 flex flex-col gap-2">
            <div className="grid place-content-center p-3 font-medium">Filters</div>
            <div className="grow flex flex-col gap-2 mt-4">
              <Filters/>
            </div>
        </div>
        <div className="grow">
          Content
        </div>
      </div>
    </main>
  );
}
