import { getUserAnswers } from "@/lib/actions/user.action";
import { TAnswer, TSearchParamsProps } from "@/types";
import UserAnswerCard from "../cards/UserAnswerCard";
interface AnswerTabProps extends TSearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: AnswerTabProps) => {
  const data = await getUserAnswers({
    userId,
  });
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-4">
      {data.userAnswers.map((answer) => (
        <UserAnswerCard answer={answer as TAnswer} />
      ))}
    </div>
  );
};

export default AnswerTab;
