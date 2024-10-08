import { user } from "@/db/schema";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import PaginationControl from "@/components/pagination-control";
import { redirect } from "next/navigation";
import { like } from "drizzle-orm";

export default async function Home({ searchParams: { page, query } }: any) {
  const where = query && like(user.name, `%${query}%`);
  const users = await db.query.user.findMany({
    where,
    limit: 10,
    offset: (page - 1) * 10,
  });

  return (
    <main className="flex min-h-screen flex-col gap-4 p-24">
      <div>
        <form
          className="flex gap-2"
          action={async (formData: FormData) => {
            "use server";
            const name = formData.get("name") as string;

            redirect(`/?${name ? `query=${name}` : ""}`);
          }}
        >
          <input
            className="p-1 px-2 rounded"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={query ?? ""}
          />
          <button
            className="bg-blue-500 text-white p-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </form>
        <h1 className="text-2xl">Current Users:</h1>
        {users.map((user) => {
          return (
            <p key={user.id}>
              {user.id} {user.name}
            </p>
          );
        })}

        {users.length === 0 && <p>No users</p>}
      </div>
      <PaginationControl
        current={page ?? 1}
        hasNextPage={users.length === 10}
      />
      <div>
        <h1 className="text-2xl mb-2">Add User</h1>
        {/* <form
          className="flex gap-2"
          action={async (formData: FormData) => {
            "use server";
            const name = formData.get("name") as string;

            await db.insert(user).values({ name }).execute();

            revalidatePath("/");
          }}
        >
          <input
            className="p-1 px-2 rounded"
            type="text"
            name="name"
            placeholder="Name"
          />
          <button
            className="bg-blue-500 text-white p-1 px-2 rounded"
            type="submit"
          >
            Add User
          </button>
        </form> */}
      </div>
    </main>
  );
}
