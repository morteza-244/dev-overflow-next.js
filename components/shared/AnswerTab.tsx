import { getUserAnswers } from "@/lib/actions/user.action";
import { TAnswer, TSearchParamsProps } from "@/types";
import UserAnswerCard from "../cards/UserAnswerCard";
import PaginationButton from "./PaginationButton";
interface AnswerTabProps extends TSearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: AnswerTabProps) => {
  const {userAnswers, totalPages, hasMore} = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-4">
        {userAnswers.map((answer) => (
          <UserAnswerCard
            key={answer._id}
            answer={answer as TAnswer}
            clerkId={clerkId}
          />
        ))}
      </div>
      <PaginationButton
        pageNumber={searchParams.page ? +searchParams.page : 1}
        totalPages={totalPages!}
        hasMore={hasMore!}
      />
    </div>
  );
};

export default AnswerTab;
