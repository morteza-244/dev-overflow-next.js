interface QuestionDetailProps {
  params: {
    id: string;
  };
}

const QuestionDetail = ({ params }: QuestionDetailProps) => {
  return <div>Question Detail: {params.id}</div>;
};

export default QuestionDetail;
