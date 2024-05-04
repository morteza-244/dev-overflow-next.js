import QuestionForm from "@/components/forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { TQuestion } from "@/types";
import { auth } from "@clerk/nextjs/server";

interface EditQuestionProps {
  params: {
    id: string;
  };
}

const EditQuestion = async ({ params }: EditQuestionProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const currentUser = await getUserById({
    userId,
  });
  const data = await getQuestionById({
    questionId: params.id,
  });
  return (
    <>
      <h1 className="text-dark200_light900 h1-bold">Edit Question</h1>
      <div className="mt-5">
        <QuestionForm type={"EDIT"} currentUserId={currentUser._id} questionDetails={JSON.stringify(data)} />
      </div>
    </>
  );
};

export default EditQuestion;
