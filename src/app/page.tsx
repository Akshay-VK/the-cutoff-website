import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { collegeTable } from "~/server/db/schema";
import Test from "./test";

export default async function HomePage() {

  let karnatakaColleges = await db.select().from(collegeTable).where(
    eq(collegeTable.state,"Karnataka")
  );


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Hello there
        </h1>
        <Test colleges={karnatakaColleges} />
      </div>
    </main>
  );
}
