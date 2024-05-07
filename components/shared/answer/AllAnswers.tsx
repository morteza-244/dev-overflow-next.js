import FilterSelector from "@/components/shared/FilterSelector";
import PaginationButton from "@/components/shared/PaginationButton";
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
  const {answers, hasMore, totalPages} = await getAnswers({
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
        {answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            answer={answer as TAnswer}
            userId={userId}
          />
        ))}
        <PaginationButton hasMore={hasMore!} totalPages={totalPages!} pageNumber={page ? +page : 1}/>
      </div>
    </>
  );
};

export default AllAnswers;
