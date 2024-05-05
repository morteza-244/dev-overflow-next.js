import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { TQuestion, TUrlParams } from "@/types";

const TagsDetail = async ({ params, searchParams }: TUrlParams) => {
  const data = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
  });
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">{data.tagTitle}</h1>
      <div>
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
        />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!data?.questions.length ? (
          <NoResult
            title="tags"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          data?.questions.map((question: TQuestion) => (
            <QuestionCard key={question._id} question={question} />
          ))
        )}
      </div>
    </div>
  );
};

export default TagsDetail;
