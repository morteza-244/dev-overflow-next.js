"use client";
import { globalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (value: string) => {
    if (active === value) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(value);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: value.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex sm:items-center  gap-5 px-2.5 sm:px-5">
      <p className="text-text-dark400_light800 body-medium">Type: </p>
      <div className="flex gap-3 flex-wrap">
        {globalSearchFilters.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={`light-border-2 small-medium dark:text-light-800 rounded-sm shadow-md px-4 py-[6px] capitalize dark:hover:text-light-900
            ${
              active === filter.value
                ? "bg-primary-500 text-light-900"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
            }
          `}
            onClick={() => handleTypeClick(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
