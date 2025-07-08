"use client";

import type { collegeTable } from "~/server/db/schema";

export default function Test(props: {
    colleges: (typeof collegeTable.$inferSelect)[];
}) {
    return (
        <ul className="list-disc">
            {props.colleges.map((college) => (
                <li key={college.id}>
                    {college.id} - {college.name} - {college.state} - {college.type}
                </li>
            ))}
        </ul>
    );
}