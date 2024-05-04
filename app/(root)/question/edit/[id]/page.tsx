import { TUrlParams } from "@/types";

const EditQuestion = ({ params }: TUrlParams) => {
  return <div>QuestionId: {params.id}</div>;
};

export default EditQuestion;
