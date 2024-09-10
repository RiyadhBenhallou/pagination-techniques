import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const notificationTable = pgTable("notification", {
  id: serial("id"),
  userId: integer("user_id").references(() => user.id),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
