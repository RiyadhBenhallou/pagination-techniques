"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { like } from "drizzle-orm";

export async function fetchUsers({ pageParam }: any, query: any) {
  const where = query && like(user.name, `%${query}%`);
  const users = await db.query.user.findMany({
    where,
    limit: 15,
    offset: (pageParam - 1) * 15,
  });
  return { data: users, nextCursor: pageParam + 1 };
}
