"use client";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
interface PaginationProps {
  pageNumber: number;
  hasMore: boolean;
  totalPages?: number;
}

const PaginationButton = ({
  hasMore,
  pageNumber,
  totalPages,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  if (totalPages! <= 1) return null;
  const handleNavigation = (type: "PREV" | "NEXT") => {
    const nextPageNumber = type === "PREV" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      key: "page",
      params: searchParams.toString(),
      value: nextPageNumber.toString(),
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="w-full flex items-center flex-wrap gap-2">
      <Button
        size={"sm"}
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("PREV")}
        className="active:scale-95 transition-transform"
      >
        Previous
      </Button>
      <Button
        size={"sm"}
        disabled={!hasMore}
        onClick={() => handleNavigation("NEXT")}
        className="active:scale-95 transition-transform"
      >
        Next
      </Button>
      <p className="text-sm font-semibold text-dark400_light700">
        Page {pageNumber} {totalPages ? `of ${totalPages}` : ""}
      </p>
    </div>
  );
};

export default PaginationButton;
