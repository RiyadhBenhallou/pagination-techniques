"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function PaginationControl({ current, hasNextPage }: any) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  return (
    <Pagination>
      <PaginationContent>
        {Number(current) !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/?page=${Number(current) - 1}${
                current && query ? "&" : ""
              }${query ? `query=${query}` : ""}`}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{Number(current)}</PaginationLink>
        </PaginationItem>
        {hasNextPage && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`/?page=${Number(current) + 1}${
                  current && query ? "&" : ""
                }${query ? `query=${query}` : ""}`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
