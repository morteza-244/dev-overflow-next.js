import FilterSelector from "@/components/shared/FilterSelector";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { userFilters } from "@/constants/filters";

const Community = () => {
  return (
    <>
      <div className="space-y-6">
        <h1 className="h1-bold">All Users</h1>
        <div className="flex sm:items-center flex-col sm:flex-row gap-4">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
          />
          <FilterSelector filters={userFilters} />
        </div>
      </div>
    </>
  );
};

export default Community;
