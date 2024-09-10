"use server";

import { db } from "@/db";
import { notificationTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function markAsRead(notificationId: number) {
  await db
    .update(notificationTable)
    .set({ isRead: true })
    .where(eq(notificationTable.id, notificationId));
  revalidatePath("/notifications");
}
