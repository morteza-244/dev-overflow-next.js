"use client";

import ResultCard from "@/components/cards/ResultCard";
import ResultLoading from "@/components/shared/ResultLoading";
import { globalSearch } from "@/lib/actions/general.action";
import { TSearchResult } from "@/types";
import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";

const GlobalSearchResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TSearchResult[]>([]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await globalSearch({
        query: global,
        type,
      });
      setData(JSON.parse(res));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (global) fetchData();
  }, [global, type]);

  return (
    <div className="absolute top-full w-full h-[260px] sm:max-h-96 overflow-y-auto mt-3 bg-light-800 dark:bg-dark-400 rounded-md shadow-md pb-2">
      <div className="sticky top-0 bg-light-800 dark:bg-dark-400 z-50 pt-4">
        <GlobalFilters />
        <div className="my-4 h-[1px] bg-light-700/100 dark:bg-dark-500/50" />
      </div>
      <div className="space-y-5">
        <p className="paragraph-semibold text-dark400_light800 px-2.5 sm:px-5">
          Top Match
        </p>
        {isLoading ? (
          <ResultLoading />
        ) : (
          <div className="flex flex-col gap-2">
            {!data.length ? (
              <div className="flex-center flex-col px-5">
                <Frown size={30} />
                <p className="text-dark200-light800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            ) : (
              data.map((item, index) => (
                <ResultCard key={item.type + item.id + index} data={item} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
