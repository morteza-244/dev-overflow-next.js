"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { Filters } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterSelectorProps {
  filters: Filters[];
  otherClasses?: string;
}

const FilterSelector = ({ filters }: FilterSelectorProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterValue = searchParams.get("filter");
  const handleFilters = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, {
      scroll: false,
    });
  };
  return (
    <Select
      onValueChange={handleFilters}
      defaultValue={filterValue || undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        {filters.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelector;
