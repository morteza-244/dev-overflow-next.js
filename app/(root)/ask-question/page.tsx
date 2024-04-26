import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const AskQuestion = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
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
