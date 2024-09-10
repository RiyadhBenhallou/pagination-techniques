import { db } from "@/db";
import { DropdownMenuCheckboxes } from "./dropdown";
import { Button } from "@/components/ui/button";
import { notificationTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Nots() {
  const notifications = await db.query.notificationTable.findMany({
    where: eq(notificationTable.userId, 1),
    orderBy: (notification, { desc }) => [desc(notification.createdAt)],
  });

  console.log(notifications);
  return (
    <>
      <DropdownMenuCheckboxes notifications={notifications} />
      <form>
        <Button
          formAction={async () => {
            "use server";
            console.log("hhh");
            await db.insert(notificationTable).values({
              userId: 1,
              message: "test test test",
            });
            revalidatePath("/notifications");
          }}
        >
          Create Notification
        </Button>
      </form>
    </>
  );
}
