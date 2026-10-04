import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const business = sqliteTable("business", {
  id: text("id").primaryKey(),
  revision: integer("revision").notNull(),
  body: text("body").notNull(),
});
export const requests = sqliteTable(
  "requests",
  {
    id: text("id").primaryKey(),
    token: text("token").notNull(),
    code: text("code").notNull().unique(),
    revision: integer("revision").notNull(),
    status: text("status").notNull(),
    date: text("date").notNull(),
    time: text("time").notNull(),
    guests: integer("guests").notNull(),
    body: text("body").notNull(),
  },
  (t) => [index("requests_slot").on(t.date, t.time, t.status)],
);
export const feedback = sqliteTable("feedback", {
  id: text("id").primaryKey(),
  requestId: text("request_id").notNull().unique(),
  body: text("body").notNull(),
});
export const subscribers = sqliteTable("subscribers", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  token: text("token").notNull(),
  body: text("body").notNull(),
});
export const limits = sqliteTable("limits", {
  id: text("id").primaryKey(),
  count: integer("count").notNull(),
  expires: integer("expires").notNull(),
});
