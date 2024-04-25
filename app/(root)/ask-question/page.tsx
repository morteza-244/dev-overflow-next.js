import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
const AskQuestion = async () => {
  const userId = "CL1234";
  const currentUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-7">
        <QuestionForm currentUserId={JSON.stringify(currentUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
