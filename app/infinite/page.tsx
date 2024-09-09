"use client";
import { user } from "@/db/schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { like } from "drizzle-orm";
import { redirect } from "next/navigation";
import { fetchUsers } from "./actions";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home({ searchParams: { query } }: any) {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => await fetchUsers({ pageParam }, query),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="flex min-h-screen flex-col gap-4 p-24">
      <div>
        <form
          className="flex gap-2"
          action={(formData: FormData) => {
            const name = formData.get("name") as string;

            redirect(`/infinite${name ? `?query=${name}` : ""}`);
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
        {data?.pages.map((page, i) => {
          return (
            <div key={i}>
              {page?.data?.map((user) => {
                return (
                  <div key={user.id} className="p-2 border">
                    {user.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div ref={ref}>
        {isFetchingNextPage && <Loader2 className="animate-spin" />}
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
