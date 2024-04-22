"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filters } from "@/types";

interface FilterSelectorProps {
  filters: Filters[];
  otherClasses?: string;
}

const FilterSelector = ({ filters }: FilterSelectorProps) => {
  return (
    <Select>
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
