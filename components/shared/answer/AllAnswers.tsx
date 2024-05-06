import FilterSelector from "@/components/shared/FilterSelector";
import { answerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { TAnswer } from "@/types";
import { ObjectId } from "mongoose";
import AnswerCard from "./AnswerCard";

interface AllAnswersProps {
  questionId: string;
  totalAnswers: number;
  userId: ObjectId;
  filter?: string;
  page?: number;
}

const AllAnswers = async ({
  questionId,
  totalAnswers,
  userId,
  filter,
  page,
}: AllAnswersProps) => {
  const data = await getAnswers({
    questionId,
    sortBy: filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <div className="flex-between">
        <h3>{totalAnswers} Answers</h3>
        <FilterSelector filters={answerFilters} />
      </div>
      <div className="space-y-3">
        {data.answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            answer={answer as TAnswer}
            userId={userId}
          />
        ))}
      </div>
    </>
  );
};

export default AllAnswers;
