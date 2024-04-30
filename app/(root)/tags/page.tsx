import TagCard from "@/components/cards/TagCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
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
            <TagCard key={tag._id} tag={tag} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Tags;
