import FilterSelector from "@/components/shared/FilterSelector";
import { answerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import AnswerCard from "./AnswerCard";
import { ObjectId } from "mongoose";
import { TAnswer } from "@/types";

interface AllAnswersProps {
  questionId: string;
  totalAnswers: number;
  userId: ObjectId;
}

const AllAnswers = async ({ questionId, totalAnswers, userId }: AllAnswersProps) => {
  const data = await getAnswers({
    questionId,
  });

  return (
    <>
      <div className="flex-between">
        <h3>{totalAnswers} Answers</h3>
        <FilterSelector filters={answerFilters} />
      </div>
      <div>
        {data.answers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer as TAnswer} userId={userId} />
        ))}
      </div>
    </>
  );
};

export default AllAnswers;
