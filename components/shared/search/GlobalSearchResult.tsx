"use client";

import ResultLoading from "@/components/shared/ResultLoading";
import { Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalFilters from "./GlobalFilters";

const GlobalSearchResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([
    { type: "question", id: "1", title: "Next.js" },
    { type: "tag", id: "2", title: "React.js" },
    { type: "user", id: "3", title: "Amir" },
  ]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  const fetchData = async () => {};
  useEffect(() => {
    try {
      setIsLoading(true);
      fetchData();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    return "/";
  };
  return (
    <div className="absolute top-full w-full mt-3 bg-light-800 dark:bg-dark-400 rounded-md shadow-md py-5">
      <GlobalFilters />
      <div className="my-4 h-[1px] bg-light-700/100 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="paragraph-semibold text-dark400_light800 px-5">
          Top Match
        </p>
        {isLoading ? (
          <ResultLoading />
        ) : (
          <div className="flex flex-col gap-2 ">
            {!data.length ? (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200-light800 body-regular px-5 py-2.5">
                  No data
                </p>
              </div>
            ) : (
              data.map((item: any, index) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink("type", "1")}
                  className="flex items-start w-full cursor-pointer px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50 gap-2 transition-all"
                >
                  <Tag size={20} />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200-light800 line-clamp-1 body-medium">
                      {item.title}
                    </p>
                    <p className="font-bold text-light400_light500 mt-1 capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearchResult;
