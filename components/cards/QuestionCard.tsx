import { getTimestamp } from "@/lib/utils";
import { Question } from "@/types";
import Link from "next/link";
import Metric from "../shared/Metric";
import RenderTag from "../shared/RenderTag";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(question.createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3 5 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <RenderTag key={tag._id} tag={tag} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="avatar"
          value={question.author.name}
          href={`/profile/${question.author._id}`}
          isAuthor
          title={" - 1 hour ago"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={question.upVotes}
          title={"Votes"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={question.answers}
          title={"Answers"}
          textStyles="text-sm"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={question.upVotes}
          title={"Views"}
          textStyles="text-sm"
        />
      </div>
    </div>
  );
};

export default QuestionCard;