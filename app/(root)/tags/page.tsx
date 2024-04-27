import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { tagFilters } from "@/constants/filters";
import { getTags } from "@/lib/actions/tag.action";

const Tags = async () => {
  const data = await getTags({});
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
      {!data.tags.length ? (
        <div className="mt-5">
          <NoResult
            description="It looks like there no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
            title="No Tags Found"
          />
        </div>
      ) : (
        <section className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
          {data.tags.map((tag) => (
            <div className="shadow-md dark:shadow-none dark:bg-[#0F1117] rounded-lg">
              <article className="w-full space-y-5 p-4">
                <Button variant="secondary" size={"sm"}>
                  {tag.name}
                </Button>
                <p>
                  <span className="text-primary-500 font-semibold">
                    {tag.questions.length}+{" "}
                  </span>
                  Question
                </p>
              </article>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Tags;
