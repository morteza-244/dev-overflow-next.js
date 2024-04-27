import FilterSelector from "@/components/shared/FilterSelector";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { tagFilters } from "@/constants/filters";

const Tags = () => {
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">All Tags</h1>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
        />
        <FilterSelector filters={tagFilters} />
      </div>
    </div>
  );
};

export default Tags;
