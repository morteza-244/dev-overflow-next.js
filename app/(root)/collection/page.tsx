import QuestionCard from "@/components/cards/QuestionCard";
import FilterSelector from "@/components/shared/FilterSelector";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { questionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { TQuestion } from "@/types";
import { auth } from "@clerk/nextjs/server";

const Collection = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const data = await getSavedQuestions({
    clerkId: userId,
  });
  return (
    <div className="space-y-6">
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="flex sm:items-center flex-col sm:flex-row gap-4">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
        />
        <FilterSelector filters={questionFilters} />
      </div>
      <div className="flex flex-col gap-6 w-full">
        {!data?.savedQuestions.length ? (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        ) : (
          data?.savedQuestions.map((question: TQuestion) => (
            <QuestionCard key={question._id} question={question} />
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
