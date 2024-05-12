import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import PaginationButton from "@/components/shared/PaginationButton";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { TQuestion, TUrlParams } from "@/types";

const TagsDetail = async ({ params, searchParams }: TUrlParams) => {
  const { hasMore, questions, tagTitle } =
    await getQuestionsByTagId({
      tagId: params.id,
      searchQuery: searchParams.q,
      page: searchParams.page ? +searchParams.page : 1,
    });

  return (
    <div className="space-y-6">
      <h1 className="h1-bold">{tagTitle}</h1>
      <div>
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
        />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!questions.length ? (
          <NoResult
            title="tags"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          questions.map((question: TQuestion) => (
            <QuestionCard key={question._id} question={question} />
          ))
        )}
      </div>
      <PaginationButton
        pageNumber={searchParams.page ? +searchParams.page : 1}
        hasMore={hasMore!}
      />
    </div>
  );
};

export default TagsDetail;
