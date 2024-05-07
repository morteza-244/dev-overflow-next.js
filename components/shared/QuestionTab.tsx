import { getUserQuestions } from "@/lib/actions/user.action";
import { TQuestion, TSearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import PaginationButton from "./PaginationButton";

interface QuestionTabProps extends TSearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({
  userId,
  clerkId,
  searchParams,
}: QuestionTabProps) => {
  const { userQuestions, totalPages, hasMore } =
    await getUserQuestions({
      userId,
      page: searchParams.page ? +searchParams.page : 1,
    });
    
  return (
    <div className="space-y-3">
      {userQuestions.map((question) => (
        <QuestionCard
          key={question._id}
          question={question as TQuestion}
          clerkId={clerkId}
        />
      ))}
      <PaginationButton
        pageNumber={searchParams.page ? +searchParams.page : 1}
        totalPages={totalPages!}
        hasMore={hasMore!}
      />
    </div>
  );
};

export default QuestionTab;
