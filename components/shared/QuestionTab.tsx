import { getUserQuestions } from "@/lib/actions/user.action";
import { TQuestion, TSearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface QuestionTabProps extends TSearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({
  userId,
  clerkId,
  searchParams,
}: QuestionTabProps) => {
  const data = await getUserQuestions({
    userId,
  });
  return (
    <div className="space-y-3">
      {data.userQuestions.map((question) => (
        <QuestionCard key={question._id} question={question as TQuestion} />
      ))}
    </div>
  );
};

export default QuestionTab;
