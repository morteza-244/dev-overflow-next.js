import { getQuestionById } from "@/lib/actions/question.action";

interface QuestionDetailProps {
  params: {
    id: string;
  };
}

const QuestionDetail = async ({ params }: QuestionDetailProps) => {
  const question = await getQuestionById({
    questionId: params.id,
  });
  return <div>{question.title}</div>;
};

export default QuestionDetail;
