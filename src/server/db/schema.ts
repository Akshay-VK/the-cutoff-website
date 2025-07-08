import "server-only"; // This is required to ensure that the server-only code is executed in the server context.

import { integer, serial, text, pgTableCreator, pgEnum } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator(
  (name) => `the-cutoff-website_${name}`,
);

export const collegeTypeEnum = pgEnum("college_type",["IIT","NIT","IIIT","GFTI"]);

export const seatTypeEnum = pgEnum("seat_type", [
  "open",
  "open_pwd",
  "ews",
  "ews_pwd",
  "obc",
  "obc_pwd",
  "sc",
  "sc_pwd",
  "st",
  "st_pwd",
]);

export const genderEnum = pgEnum("gender", ["Gender-Neutral", "Female-only (including Supernumerary)"]);

export const rankTypeEnum = pgEnum("rank_type", ["AI","OS","HS","GO","LA","JK"]);

export const collegeTable = createTable('college_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  state: text('state').notNull(),
  type: collegeTypeEnum('type').notNull(),  
});
export const cutoffTable = createTable('cutoff_table', {
  id: serial('id').primaryKey(),
  courseName: text('course_name').notNull(),
  collegeId: integer('college_id')
    .notNull()
    .references(() => collegeTable.id),
  year: integer('year').notNull(),
  round: integer('round').notNull(),
  seatType: seatTypeEnum('seat_type').notNull(),
  gender: genderEnum('gender').notNull(),
  rankType: rankTypeEnum('rank_type').notNull(),
  openingRank: integer('opening_rank').notNull(),
  closingRank: integer('closing_rank').notNull(),

});


export type InsertCollege = typeof collegeTable.$inferInsert;
export type SelectCollege = typeof collegeTable.$inferSelect;
export type InsertCutoff = typeof cutoffTable.$inferInsert;
export type SelectCutoff = typeof cutoffTable.$inferSelect;
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = sqliteTableCreator(
//   (name) => `the-cutoff-website_${name}`,
// );