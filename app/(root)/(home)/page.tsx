import FilterSelector from "@/components/shared/FilterSelector";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import Link from "next/link";

const Home = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between sm:items-center sm:flex-row flex-col-reverse gap-4">
        <h1 className="h1-bold">All Questions</h1>
        <Link href="/ask-question" className="ms-auto sm:m-0">
          <Button className="primary-gradient" size={"sm"}>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
        />
        <FilterSelector filters={homePageFilters} />
      </div>
    </div>
  );
};

export default Home;
