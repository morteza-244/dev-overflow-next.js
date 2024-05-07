import TagCard from "@/components/cards/TagCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import PaginationButton from "@/components/shared/PaginationButton";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { tagFilters } from "@/constants/filters";
import { getTags } from "@/lib/actions/tag.action";
import { TSearchParamsProps } from "@/types";

const Tags = async ({ searchParams }: TSearchParamsProps) => {
  const { tags, hasMore, totalPages } = await getTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
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
      {!tags.length ? (
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
          {tags.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </section>
      )}
      <PaginationButton
        pageNumber={searchParams.page ? +searchParams.page : 1}
        hasMore={hasMore!}
        totalPages={totalPages!}
      />
    </div>
  );
};

export default Tags;
