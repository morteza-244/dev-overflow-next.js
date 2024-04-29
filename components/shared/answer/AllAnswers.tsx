import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import FilterSelector from "@/components/shared/FilterSelector";
import AnswerCard from "./AnswerCard";

interface AllAnswersProps {
  questionId: string;
  totalAnswers: number;
}

const AllAnswers = async ({
  questionId,
  totalAnswers,
}: AllAnswersProps) => {

  const data = await getAnswers({
    questionId,
  });
  
  return (
    <>
      <div className="flex-between">
        <h3>{totalAnswers} Answers</h3>
        <FilterSelector filters={AnswerFilters} />
      </div>
      <div>
        {data.answers.map((answer) => (
          <AnswerCard key={answer._id} answer={answer} />
        ))}
      </div>
    </>
  );
};

export default AllAnswers;
